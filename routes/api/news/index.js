const { authentication } = require("@root/authentication");
const { crawlLatest, getTrendingNews } = require("@root/controllers/api/news");

const NewsRouter = require("express").Router();

NewsRouter.post("/crawl-latest", authentication, crawlLatest);
NewsRouter.get("/trending", authentication, getTrendingNews);

module.exports = NewsRouter;
