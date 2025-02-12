const { crawlNews, embedNews } = require("../../../services/ai-app");
const { fetchLatestNews } = require("../../../services/news");
const News = require("../../../models/News");

exports.crawlLatest = async (req, res) => {
  const latestNews = await fetchLatestNews();

  const newsBySource = latestNews.reduce((acc, news) => {
    if (!acc[news.source.name]) {
      acc[news.source.name] = [];
    }
    acc[news.source.name].push(news.url);
    return acc;
  }, {});

  const newsWithContent = [];

  try {
    for (const source in newsBySource) {
      const newsUrls = newsBySource[source];
      const newsContent = await crawlNews(newsUrls);

      newsWithContent.push(...newsUrls.map((url) => ({
        title: latestNews.find(news => news.url === url).title,
        description: latestNews.find(news => news.url === url).description,
        url: url,
        content: newsContent.find(item => item.url === url).content,
        source: source,
        publishedAt: latestNews.find(news => news.url === url).publishedAt,
      })));
    }

  try {
    newsWithContent.forEach(async (news) => {
      await createNewsIfNotExists(news);
    });
    return res.status(201).json({ data: newsWithContent });

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
