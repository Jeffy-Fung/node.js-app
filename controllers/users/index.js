const { body } = require("express-validator");
const User = require("../../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateCreateUser = () => {
  body("username").exists().withMessage("Username is required");
  body("password").exists().withMessage("Username is required");
  body("email").withMessage("Email should be a valid email address").optional().isEmail();
  body("phone").withMessage("Phone should be a number").optional().isNumeric();
  body("firstName").withMessage("First name should be a string").optional().isString();
  body("lastName").withMessage("Last name should be a string").optional().isString();
};