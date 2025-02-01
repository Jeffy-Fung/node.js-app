const {
  getChatSessions,
  getChatSession,
} = require("@controllers/api/chat-sessions");

const ChatSessionRouter = require("express").Router();

ChatSessionRouter.get("/", getChatSessions);
ChatSessionRouter.get("/:id", getChatSession);

module.exports = ChatSessionRouter;
