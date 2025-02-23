const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { secret, expiresIn } = require("../config/config");

const verifyToken = promisify(jwt.verify);

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in .env
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log the error for debugging
    return res.status(401).json({ message: "Invalid token" });
  }
};
