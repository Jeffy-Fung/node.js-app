const { simpleChat, ragChat } = require("@services/ai-app");
const ChatHistory = require("@models/ChatHistory");
const News = require("@models/News");

exports.createChat = async (req, res) => {
  const { messages, sessionId } = req.body;
  const inputUserMessage = messages[0].text;

  // TODO: User data base transation
  await ChatHistory.create({
    session: sessionId,
    role: "human",
    message: inputUserMessage,
  });

  const chatHistories = await ChatHistory.find({ session: sessionId });

  const serializedMessages = chatHistories.map((chatHistory) => [
    chatHistory.role,
    chatHistory.message,
  ]);

  console.log(serializedMessages);

  const aiMessage = await simpleChat(serializedMessages);

  await ChatHistory.create({
    session: sessionId,
    role: "ai",
    message: aiMessage,
  });

  return res.status(201).json({ text: aiMessage });
};

exports.createRagChat = async (req, res) => {
  const { messages, sessionId } = req.body;
  const inputUserMessage = messages[0].text;

  // TODO: User data base transation
  await ChatHistory.create({
    session: sessionId,
    role: "human",
    message: inputUserMessage,
  });

  const chatHistories = await ChatHistory.find({ session: sessionId });

  const serializedMessages = chatHistories.map((chatHistory) => [
    chatHistory.role,
    chatHistory.message,
  ]);

  const recentNews = await News.find({
    publishedAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 48) },
  });

  const filtered_document_ids = recentNews.map((news) => news._id);

  const aiMessage = await ragChat(serializedMessages, filtered_document_ids, inputUserMessage);

  await ChatHistory.create({
    session: sessionId,
    role: "ai",
    message: aiMessage,
  });

  return res.status(201).json({ text: aiMessage });
};
