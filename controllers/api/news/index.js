const { crawlNews } = require("@root/services/ai-app");
const { fetchLatestNews } = require("@root/services/news");
const { News } = require("@root/models/News");

exports.crawl_latest = async (req, res) => {
  const latest_news = await fetchLatestNews();

  const news_content = await crawlNews(latest_news.map((news) => news.url));

  const news_with_content = latest_news.map((news) => ({
    title: news.title,
    description: news.description,
    url: news.url,
    content: news_content.filter((item) => item.url === news.url).content,
    source: news.source,
    publishedAt: news.publishedAt,
  }));

  news_with_content.forEach(async (news) => {
    await News.createIfNotExists(news);
  });

  return res.status(201).json({ text: news_with_content });

};
