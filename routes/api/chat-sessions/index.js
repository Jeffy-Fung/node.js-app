const {
  getChatSessions,
  getChatHistories,
  createSimpleChatSession,
  createRagChatSession,
} = require("@controllers/api/chat-sessions");
const { authentication } = require("@root/authentication");


const ChatSessionRouter = require("express").Router();

ChatSessionRouter.get("/", authentication, getChatSessions);
ChatSessionRouter.post("/simple", authentication, createSimpleChatSession);
ChatSessionRouter.post("/rag", authentication, createRagChatSession);
ChatSessionRouter.get("/:id/chat-histories", authentication, getChatHistories);


module.exports = ChatSessionRouter;
