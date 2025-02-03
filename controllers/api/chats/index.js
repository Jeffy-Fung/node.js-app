const { simpleChat } = require("@services/ai-app");
const ChatHistory = require("@models/ChatHistory");

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
    role: "system",
    message: aiMessage,
  });

  return res.status(201).json({ text: aiMessage });
};
