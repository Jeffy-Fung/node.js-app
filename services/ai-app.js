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

exports.crawlNews = async (news_urls) => {
  const urlParams = news_urls.map(url => `urls=${url}`).join('&');

  try {
    const response = await fetch(`${process.env.AI_APP_URL}/news-deails?${urlParams}`, {
      method: "GET",
    });

    const data = await response.json();
    return data.map((news) => {
      return {
        title: news._title,
        content: news._text,
        url: news.url,
      }
    });


  } catch (error) {
    console.log("Error during fetch:", error);
    throw error;
  }
};
