const { checkSchema } = require("express-validator");
const {
  getUsers,
  getUser,
  createUser,
  createUserValidationSchema,
} = require("@controllers/users");
const { authentication } = require("@root/authentication");

const UserRouter = require("express").Router();

UserRouter.get("/", authentication, getUsers);
UserRouter.post("/", checkSchema(createUserValidationSchema), createUser);

// TODO: add authentication
UserRouter.get("/:id", getUser);

module.exports = UserRouter;
