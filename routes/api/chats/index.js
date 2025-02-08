const {
  createChat,
  createRagChat,
} = require("@controllers/api/chats");

const ChatRouter = require("express").Router();

ChatRouter.post("/", createChat);
ChatRouter.post("/rag", createRagChat);

module.exports = ChatRouter;
