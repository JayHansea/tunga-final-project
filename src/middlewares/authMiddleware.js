const jwt = require("jsonwebtoken");

/**
 * @typedef {Object} UserPayload
 * @property {string} userId
 * @property {string} role
 */

/**
 * Middleware to authenticate and authorize users.
 * @param {string[]} [roles] - List of roles that are authorized to access the route.
 * @returns {Function} Middleware function.
 */
const authMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return; // Exit after sending the response
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token

      req.body.user = decoded;

      // Check if the user's role is authorized
      if (roles && !roles.includes(decoded.role)) {
        res.status(403).json({ message: "Forbidden" });
        return; // Exit after sending the response
      }

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
      return; // Exit after sending the response
    }
  };
};

module.exports = authMiddleware;
