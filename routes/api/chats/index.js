const {
  createChat,
} = require("@controllers/api/chats");

const ChatRouter = require("express").Router();

ChatRouter.post("/", createChat);

module.exports = ChatRouter;
