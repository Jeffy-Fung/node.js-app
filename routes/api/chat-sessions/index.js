const {
  getChatSessions,
  getChatHistories,
} = require("@controllers/api/chat-sessions");
const { authentication } = require("@root/authentication");

const ChatSessionRouter = require("express").Router();

ChatSessionRouter.get("/", authentication, getChatSessions);
ChatSessionRouter.get("/:id/chat-histories", authentication, getChatHistories);

module.exports = ChatSessionRouter;
