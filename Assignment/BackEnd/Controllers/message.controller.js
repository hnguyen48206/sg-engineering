const Message = require("../Entities/Message");
const events = require("events");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.BOT_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//reference to the list of current bot connections.
listOfAIBot = {};

//get history
const getAll = async (req, res) => {
  try {
    let msgRepository = global.db.getRepository(Message);
    const userId = req.userId;
    const msgs = await msgRepository.find({ where: { userId } });
    res.json({
      message: "List of messages",
      data: msgs,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

//add user prompt message
const add = async (req, res) => {
  try {
    const userId = req.userId;
    //save prompt to db
    await add_msg_to_db(userId, false, req.body.message);
    //get AI response
    getBotReply(userId, req.body.message);
    res.status(201).json({
      message: "New message added",
      data: savedMsg,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

async function add_msg_to_db(userId, isBot, message) {
  let msgRepository = global.db.getRepository(Message);
  const newMsg = msgRepository.create({
    isBot: false,
    message: message,
    userId: userId,
  });
  await msgRepository.save(newMsg);
}

//get AI reply
async function getBotReply(userId, msg) {
  try {
    const result = await model.generateContent(msg);
    if (result?.response) {
      const reply = result.response.text();
      //save AI msg to db
      await add_msg_to_db(userId, true, reply);
      //notify user in chat
      if (listOfAIBot[userId]) {
        listOfAIBot[userId].emit("newMessage", reply);
      }
      return Promise.resolve(reply);
    }
  } catch (error) {
    console.log(error);
    return Promise.resolve(null);
  }
}

//subscription to recieve bot response
const subscription = async (req, res) => {
  delete listOfAIBot[req.userId];
  listOfAIBot[req.userId] = new events.EventEmitter();

  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });

  listOfAIBot[req.userId].on("newMessage", function (msg) {
    res.write(`data: ${msg}\n\n`);
  });

  res.on("close", () => {
    delete listOfAIBot[req.userId];
    res.end();
  });
};

module.exports = {
  getAll,
  add,
  subscription,
};
