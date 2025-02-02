const ChatSession = require("@models/ChatSession");
const ChatHistory = require("@models/ChatHistory");

exports.getChatSessions = async (req, res) => {
  const user = req.user;
  const chatSessions = await ChatSession.find({ user: user._id });
  return res.status(200).json({ data: chatSessions });
};

exports.createChatSession = async (req, res) => {
  const user = req.user;
  const chatSession = await ChatSession.create({ user: user._id });
  return res.status(201).json({ data: chatSession });
};

exports.getChatHistories = async (req, res) => {
  const targetSessionId = req.params.id;
  const chatHistories = await ChatHistory.find({ session: targetSessionId });
  return res.status(200).json({ data: chatHistories });
};
