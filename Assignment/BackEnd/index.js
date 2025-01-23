process.env.DEFAULT_SERVER_PORT = 3000;
require("reflect-metadata");
require("dotenv").config({ path: "./Configs/.env" });
const PORT = process.env.SERVER_PORT ?? process.env.DEFAULT_SERVER_PORT;
const db_initilization = require("./Helpers/db_init");
const express = require("express");
const cookieParser = require("cookie-parser");

// Routes Load
const user_router = require("./Routes/user.route");
const msg_router = require("./Routes/message.route");

// Server Initialization
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the web app
app.use(express.static(path.join(__dirname, "public/dist/your-angular-app")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dist/your-angular-app/index.html"));
});

// API routes
app.use("/api/user", user_router);
app.use("/api/msg", msg_router);

// Swagger api docs
const swagger = require("express-joi-swagger-spec");
const swaggerOptions = require("./Configs/swaggerconfig");
swaggerOptions.host = swaggerOptions.host + PORT;
swagger.serveSwagger(app, "/apis-doc", swaggerOptions, {
  projectRootPath: __dirname,
  routeFolderName: "Routes",
  requestModelFolderName: "RequestValidator",
  responseModelFolderName: "ResponseModel",
});

// Server starts along with database connection
app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
    // Init in-memory storage for users login sessions
    global.sessions = {};
    db_initilization().catch((err) => {
      process.exit(1);
    });
  } else console.log("Error occurred, server can't start", error);
});
