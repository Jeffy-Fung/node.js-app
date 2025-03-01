exports.simpleChat = async (messages) => {
  console.log(`posting to: ${process.env.AI_APP_URL}/simple-chat`);
  console.log(JSON.stringify({ messages }));

  try {
    const response = await fetch(`${process.env.AI_APP_URL}/simple-chat`, {
      method: "POST",
      body: JSON.stringify({ messages: messages }),
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AI_APP_API_KEY,
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
  console.log(`posting to: ${process.env.AI_APP_URL}/news-details?${urlParams}`);

  try {
    const response = await fetch(`${process.env.AI_APP_URL}/news-details?${urlParams}`, {
      method: "GET",
      headers: {
        "api-key": process.env.AI_APP_API_KEY,
      },
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

exports.embedNews = async (news_articles) => {
  const payload = {
    articles: news_articles.map((article) => ({
      title: article.title,
      content: article.content,
      id: article.id,
      url: article.url,
    })),
  };

  const response = await fetch(`${process.env.AI_APP_URL}/embed-news`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.AI_APP_API_KEY,
    },
  });
  const data = await response.json();
  return data;
};

exports.ragChat = async (message_histories, filtered_document_ids, user_input) => {
  try {
    const response = await fetch(`${process.env.AI_APP_URL}/rag-chat`, {
      method: "POST",
      body: JSON.stringify({
        message_histories: message_histories,
        filtered_document_ids: filtered_document_ids,
        raw_input: user_input,
      }),
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AI_APP_API_KEY,
      },

    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.log("Error during fetch:", error);
    throw error;
  }
};

