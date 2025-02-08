const { simpleChat, ragChat } = require("@services/ai-app");
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
    role: "ai",
    message: aiMessage,
  });

  return res.status(201).json({ text: aiMessage });
};

exports.createRagChat = async (req, res) => {
  const { messages, sessionId, newsArticleIds } = req.body;
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

  const ragChatResponse = await ragChat(serializedMessages, newsArticleIds, inputUserMessage);

  const aiMessage = ragChatResponse.output.content;

  const referenceUrls = [...new Set(ragChatResponse.documents.map((document) => document.metadata.url))];

  const finalAiMessage = `${aiMessage}\n\nReferences:\n ${referenceUrls.join("\n")}`;

  await ChatHistory.create({
    session: sessionId,
    role: "ai",
    message: finalAiMessage,
  });

  return res.status(201).json({ text: finalAiMessage });
};
