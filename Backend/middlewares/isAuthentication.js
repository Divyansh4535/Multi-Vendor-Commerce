const { TOKEN_NAME, publicKey } = require("../config/constentValues");
const User = require("../models/user-model");
const { verifyToken } = require("../utils/token");

// Middleware: Check if user is logged in
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ status: false, msg: "token missing and malformed!" });
    }
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    const verifyData = verifyToken(token, publicKey);
    const user = await User.findById(verifyData.id).select("-password");
    if (!user) {
      return res.status(404).send({ status: false, msg: "User not found!" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res
      .status(500)
      .send({ status: false, msg: "Invalid or expired token." });
  }
};

// Middleware: Check if user has the required role(s)
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("req.user", req.user);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).send({
        status: false,
        msg: "You are not authorized to access this page.",
      });
    }
    next();
  };
};

module.exports = {
  isAuthenticated,
  authorizeRoles,
};

// | Term               | Meaning                                     | Think Of As     |
// | ------------------ | ------------------------------------------- | --------------- |
// | **Authentication** | "Who are you?" – Verifying identity         | **Login**       |
// | **Authorization**  | "What can you do?" – Granting access rights | **Permissions** |
