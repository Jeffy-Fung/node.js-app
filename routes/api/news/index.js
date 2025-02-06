const { authentication } = require("@root/authentication");
const { crawl_latest } = require("@root/controllers/api/news");

const NewsRouter = require("express").Router();

NewsRouter.post("/latest", crawl_latest);

module.exports = NewsRouter;
