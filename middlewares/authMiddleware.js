const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'shdjdcnjs3453';

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add decoded token data (e.g., admin ID) to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

module.exports = authMiddleware;
