const { Router } = require("express");
const appController = require("../Controllers/app.controller");

const app_router = Router();

app_router.get("/", appController.hello);

module.exports = app_router;
