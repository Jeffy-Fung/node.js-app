const { authentication } = require("../../../authentication");
const { crawlLatest, getTrendingNews } = require("../../../controllers/api/news");

const NewsRouter = require("express").Router();

NewsRouter.post("/crawl-latest", authentication, crawlLatest);
NewsRouter.get("/trending", authentication, getTrendingNews);

module.exports = NewsRouter;
