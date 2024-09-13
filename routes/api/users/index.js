const { checkSchema } = require("express-validator");
const {
  getUsers,
  createUser,
  createUserValidationSchema,
} = require("../../../controllers/users");
const { authentication } = require("../../../authentication");

const UserRouter = require("express").Router();

UserRouter.get("/", authentication, getUsers);
UserRouter.post("/", checkSchema(createUserValidationSchema), createUser);

module.exports = UserRouter;
