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

    return data.articles.filter(
      (article) => article.source.id === "cnn" || article.source.name === "CNBC"
    );

  } catch (error) {
    console.log("Error during fetch:", error);
    throw error;
  }
};
