const { simpleChat } = require("@services/ai-app");

exports.createChat = async (req, res) => {
  const { messages } = req.body;
  const inputUserMessage = messages[0].text;

  console.log(inputUserMessage);

  // TODO: Append human message to chat history

  const serializedMessages = [
    ["human", inputUserMessage],
  ];

  const aiMessage = await simpleChat(serializedMessages);

  // TODO: Append ai message to chat history

  return res.status(201).json({ text: aiMessage });
};
