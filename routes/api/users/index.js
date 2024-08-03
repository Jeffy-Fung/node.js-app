const { getUsers, createUser, validateCreateUser } = require("../../../controllers/users");

const UserRouter = require("express").Router();

UserRouter.get("/", getUsers);
UserRouter.post("/", validateCreateUser, createUser);

module.exports = UserRouter;
