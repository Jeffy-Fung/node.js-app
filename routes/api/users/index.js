const { getUsers } = require("../../../controllers/users");

const UserRouter = require("express").Router();

UserRouter.get("/list", getUsers);

module.exports = UserRouter;
