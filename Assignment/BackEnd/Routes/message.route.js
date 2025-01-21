const { Router } = require("express");
const msgController = require("../Controllers/message.controller");
const { createSchema } = require("../Entities/Message.validate");
const validator = require("express-joi-validation").createValidator({});
const checkSession = require("../Middlewares/session_check");

const msg_router = Router();

//get all
msg_router.get("/", checkSession, msgController.getAll);

//create
msg_router.post(
  "/",
  checkSession,
  validator.body(createSchema),
  msgController.add
);

//message subscription
msg_router.get("/subscription", checkSession, msgController.subscription);

module.exports = msg_router;
