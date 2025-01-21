const { Router } = require("express");
const userController = require("../Controllers/user.controller");
const {
  createSchema,
  updateSchema,
  removeSchema,
  loginSchema,
} = require("../Entities/User.validate");
const validator = require("express-joi-validation").createValidator({});
const checkSession = require("../Middlewares/session_check");

const user_router = Router();

//get all
user_router.get("/", checkSession, userController.getAll);

//create
user_router.post("/", validator.body(createSchema), userController.add);

//remove
user_router.delete(
  "/:id",
  checkSession,
  validator.params(removeSchema),
  userController.remove
);

//login
user_router.post("/login", validator.body(loginSchema), userController.login);

//logout
user_router.get("/logout", checkSession, userController.logout);

module.exports = user_router;
