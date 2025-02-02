exports.simpleChat = async (messages) => {
  console.log(`posting to: ${process.env.AI_APP_URL}/simple-chat`);
  console.log(JSON.stringify({ messages }));

  try {
    const response = await fetch(`${process.env.AI_APP_URL}/simple-chat`, {
      method: "POST",
      body: JSON.stringify({ messages: messages }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data.content;
  } catch (error) {
    console.log("Error during fetch:", error);
    throw error;
  }
};
