const { body, validationResult } = require("express-validator");
const User = require("../../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.create(req.body);
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createUserValidationSchema = {
  username: {
    in: ["body"],
    errorMessage: "Username is required",
    exists: true,
  },
  password: {
    in: ["body"],
    errorMessage: "Password is required",
    exists: true,
    isLength: {
      errorMessage: "Password should be at least 8 chars long",
      options: { min: 8 },
    },
  },
  email: {
    in: ["body"],
    optional: true,
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  phone: {
    in: ["body"],
    optional: true,
    isMobilePhone: {
      errorMessage: "Invalid phone number",
    },
  },
  first_name: {
    in: ["body"],
    optional: true,
    isAlpha: {
      errorMessage: "First name should contain only letters",
    },
  },
  last_name: {
    in: ["body"],
    optional: true,
    isAlpha: {
      errorMessage: "Last name should contain only letters",
    },
  },
};
