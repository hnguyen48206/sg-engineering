const User = require("../Entities/User");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    let userRepository = global.db.getRepository(User);
    const users = await userRepository.find();
    res.json({
      message: "List of users",
      data: users,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const add = async (req, res) => {
  try {
    let userRepository = global.db.getRepository(User);
    const newUser = userRepository.create(req.body);
    const savedUser = await userRepository.save(newUser);
    res.status(201).json({
      message: "New user created",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    const userID = req.params.id;
    let userRepository = global.db.getRepository(User);
    const deleteResult = await userRepository.delete(userID);
    if (deleteResult.affected === 0)
      res.status(404).json({ error: "User not found" });
    else
      res.status(200).json({
        message: "User removed",
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  let userRepository = global.db.getRepository(User);
  const user = await userRepository.findOne({ where: { userId } });
  if (!user) return res.status(400).send("Invalid username or password");
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
  global.sessions[token] = { userId: user.id, expiresAt };
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    expires: expiresAt,
  });
  res.send({
    message: "Logged in successfully",
  });
};

const logout = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).send("No active session");
  delete sessions[token];
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.send("Logged out successfully");
};

module.exports = {
  getAll,
  add,
  remove,
  login,
  logout,
};
