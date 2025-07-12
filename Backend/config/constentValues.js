const path = require("path");
const fs = require("fs");

const privateKey = fs.readFileSync(path.join(__dirname, "../keys/private.pem"));
const publicKey = fs.readFileSync(path.join(__dirname, "../keys/public.pem"));
const SECRET_KEY = "gJ!8vN3$zQ@1xC^s#LpW0*RkT&eYd5uM";
const TOKEN_NAME = "ECommerce_Token";
const ADMIN_TOKEN_NAME = "ECommerce_Admin_Token";
const PORT = 8000;

module.exports = {
  privateKey,
  publicKey,
  TOKEN_NAME,
  PORT,
  ADMIN_TOKEN_NAME,
  SECRET_KEY,
};
