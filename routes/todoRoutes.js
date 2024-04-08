const express = require("express");
const Router = express.Router();
const authCtrl = require("../controllers/authCtrl");
const todoCtrl = require("../controllers/todoCtrl");

Router.post("/todo", authCtrl.verifyToken, todoCtrl.createTodo);

Router.get("/todo", authCtrl.verifyToken, todoCtrl.getTodo);

Router.get("/todo/:id", authCtrl.verifyToken, todoCtrl.getTodoById);

module.exports = Router;
