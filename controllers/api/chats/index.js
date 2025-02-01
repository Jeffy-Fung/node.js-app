exports.createChat = async (req, res) => {
  const { messages } = req.body;
  const inputUserMessage = messages[0].text;

  console.log(inputUserMessage);

  // TODO: Append human message to chat history

  // TODO: request to ai application

  // TODO: Append ai message to chat history

  return res.status(201).json({ text: "This is a test message from the server." });
};
