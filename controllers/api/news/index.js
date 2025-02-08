const { crawlNews, embedNews } = require("@root/services/ai-app");
const { fetchLatestNews } = require("@root/services/news");
const News = require("@root/models/News");

exports.crawl_latest = async (req, res) => {
  const latest_news = await fetchLatestNews();
  const news_content = await crawlNews(latest_news.map((news) => news.url));

  const news_with_content = latest_news.map((news) => ({
    title: news.title,
    description: news.description,
    url: news.url,
    content: news_content.filter((item) => item.url === news.url)[0].content,
    source: news.source.name,
    publishedAt: news.publishedAt,
  }));

  try {
    news_with_content.forEach(async (news) => {
      await createNewsIfNotExists(news);
    });
    return res.status(201).json({ data: news_with_content });

  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};

exports.getTrendingNews = async (req, res) => {
  const recentNews = await News.find({
    publishedAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 48) },
  });
  return res.status(200).json({
    data: recentNews.map((news) => ({
      id: news._id,
      title: news.title,
      description: news.description,
      url: news.url,
      source: news.source,
      publishedAt: news.publishedAt,
    })),
  });
};

const createNewsIfNotExists = async (data) => {
  try {
    const existingDocument = await News.findOne({ url: data.url });

    if (!existingDocument) {
      const newDocument = new News(data);
      const savedDocument = await newDocument.save();
      const embeddings = await embedNews([savedDocument]);
      return savedDocument;
    } else {
      console.log(`Document with URL ${data.url} already exists.`);
      return existingDocument;
    }
  } catch (error) {
    console.error('Error inserting document:', error);
    throw error;
  }
};
