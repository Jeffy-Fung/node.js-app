const { authentication } = require("@root/authentication");
const { crawl_latest, getTrendingNews } = require("@root/controllers/api/news");

const NewsRouter = require("express").Router();

NewsRouter.post("/latest", crawl_latest);
NewsRouter.get("/trending", authentication, getTrendingNews);

module.exports = NewsRouter;
