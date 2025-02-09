const ChatSession = require("../../../models/ChatSession");
const ChatHistory = require("../../../models/ChatHistory");

exports.getChatSessions = async (req, res) => {
  const user = req.user;
  const type = req.query.type;
  const chatSessions = await ChatSession.find({ user: user._id, type: type });

  return res.status(200).json({
    data: chatSessions.map((chatSession) => ({
      id: chatSession._id,
      userId: chatSession.user,
      createdAt: chatSession.createdAt,
      updatedAt: chatSession.updatedAt,
    })),
  });
};

exports.createSimpleChatSession = async (req, res) => {
  const user = req.user;
  const chatSession = await ChatSession.create({ user: user._id, type: "simple" });
  await ChatHistory.create({
    session: chatSession._id,
    role: "system",
    message: "You are a helpful assistant. You are going to talk to user about any question.",
  });

  return res.status(201).json({
    data: {
      id: chatSession._id,
      userId: user._id,
      createdAt: chatSession.createdAt,
      updatedAt: chatSession.updatedAt,
    },
  });
};

exports.createRagChatSession = async (req, res) => {
  const user = req.user;
  const chatSession = await ChatSession.create({ user: user._id, type: "rag" });
  await ChatHistory.create({
    session: chatSession._id,
    role: "system",
    message: "You are a helpful assistant. You are going to help the user to digest trending news and answer any question about the news.",
  });

  return res.status(201).json({
    data: {
      id: chatSession._id,
      userId: user._id,
      createdAt: chatSession.createdAt,
      updatedAt: chatSession.updatedAt,
    },
  });
};

exports.getChatHistories = async (req, res) => {
  const targetSessionId = req.params.id;
  const chatHistories = await ChatHistory.find({ session: targetSessionId });
  return res.status(200).json({
    data: chatHistories.map((chatHistory) => ({
      id: chatHistory._id,
      role: ChatHistory.convertRole(chatHistory.role),
      message: chatHistory.message,
      createdAt: chatHistory.createdAt,
      updatedAt: chatHistory.updatedAt,
    })),
  });
};
