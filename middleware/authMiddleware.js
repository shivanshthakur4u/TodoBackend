const jwt = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.Private_Key;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid User! Login/Signup" });
  }

  try {
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
