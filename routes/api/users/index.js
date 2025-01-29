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

UserRouter.get("/:id", authentication, getUser);

module.exports = UserRouter;
