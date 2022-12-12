// const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Middleware to authenticate token
  const authenticateToken = (param) => {
  return (req, res, next) => {
    // Get auth header value
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // console.log("token", token);

    // Check if token is not there
    if (token == null) return res.sendStatus(401);

    // Verify token
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err.message);
        return res.sendStatus(403);
      }
      if (param === "admin" && user.role !== "admin") {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };
}

module.exports = authenticateToken