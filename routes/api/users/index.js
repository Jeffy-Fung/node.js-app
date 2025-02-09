const { checkSchema } = require("express-validator");
const {
  getUsers,
  getUser,
  createUser,
  createUserValidationSchema,
} = require("../../../controllers/users");
const { authentication } = require("../../../authentication");

const UserRouter = require("express").Router();

UserRouter.get("/", authentication, getUsers);
UserRouter.post("/", checkSchema(createUserValidationSchema), createUser);

UserRouter.get("/my_profile", authentication, getUser);

module.exports = UserRouter;
