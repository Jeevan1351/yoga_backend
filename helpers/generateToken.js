const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

// Function to generate token
const genToken = (user) => {
  // Generate token
  const token = jwt.sign(JSON.stringify(user), process.env.JWT_TOKEN_SECRET);
  return token;
};

module.exports = genToken;
