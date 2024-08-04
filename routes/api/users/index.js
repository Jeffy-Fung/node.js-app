const { checkSchema } = require("express-validator");
const {
  getUsers,
  createUser,
  createUserValidationSchema,
} = require("../../../controllers/users");

const UserRouter = require("express").Router();

UserRouter.get("/", getUsers);
UserRouter.post("/", checkSchema(createUserValidationSchema), createUser);

module.exports = UserRouter;
