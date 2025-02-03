const ChatSession = require("@models/ChatSession");
const ChatHistory = require("@models/ChatHistory");

exports.getChatSessions = async (req, res) => {
  const user = req.user;
  const chatSessions = await ChatSession.find({ user: user._id });
  return res.status(200).json({
    data: chatSessions.map((chatSession) => ({
      id: chatSession._id,
      userId: chatSession.user,
      createdAt: chatSession.createdAt,
      updatedAt: chatSession.updatedAt,
    })),
  });
};

exports.createChatSession = async (req, res) => {
  const user = req.user;
  const chatSession = await ChatSession.create({ user: user._id });
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
