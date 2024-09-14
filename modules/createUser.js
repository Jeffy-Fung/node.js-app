const User = require("@models/User");

// TODO: create user from post user endpoint

exports.createAccountFromGoogle = async ({ username, email, googleId }) => {
  await User.create({
    username: username,
    password: generateRandomPassword(username),
    email: email,
    googleId: googleId,
  });
};

function generateRandomPassword(username) {
  const randomNumbers = Math.floor(10000000 + Math.random() * 90000000);
  return `${username}_${randomNumbers}`;
}
