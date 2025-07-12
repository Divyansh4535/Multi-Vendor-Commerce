const jwt = require("jsonwebtoken");

function generateToken(userData, key) {
  let token = jwt.sign(userData, key, {
    algorithm: "RS256",
    expiresIn: "1d",
  });
  return token;
}
function verifyToken(token, key) {
  let data = jwt.verify(token, key, { algorithm: ["RS256"] });
  return data;
}

module.exports = { generateToken, verifyToken };
