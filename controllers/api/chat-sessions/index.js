const ChatSession = require("@models/ChatSession");

exports.getChatSessions = async (req, res) => {
  const user = req.user;
  const chatSessions = await ChatSession.find({ user: user._id });
  return res.status(200).json({ data: chatSessions });
};

exports.getChatSession = async (req, res) => {
  const targetSessionId = req.params.id;
  const chatSession = await ChatSession.create({ _id: targetSessionId });
  return res.status(200).json({ data: chatSession });
};
