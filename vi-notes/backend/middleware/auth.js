const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secretkey");

    req.userId = decoded.userId;

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;