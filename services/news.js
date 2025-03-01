exports.fetchLatestNews = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&category=business&pageSize=100`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (data.status !== "ok") throw new Error("Failed to fetch news");

    console.log("number of news fetched from raw news api:", data.totalResults);

    return data.articles.filter(
      (article) => crawlableSourceNames.includes(article.source.name)
    );

  } catch (error) {
    console.log("Error during fetch:", error);
    throw error;
  }
};

const crawlableSourceNames = ["CNBC", "CNN", "Interview", "BBC News", "The Washington Post", "Unilad.com", "Fox News"];
