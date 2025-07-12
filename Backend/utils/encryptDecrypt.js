const bcrypt = require("bcrypt");

async function encryptedData(data) {
  const salt = await bcrypt.genSalt(10);
  const encryptData = await bcrypt.hash(data, salt);
  return encryptData;
}

async function decryptedData(data, encryptData) {
  return await bcrypt.compare(data, encryptData);
}
module.exports = {
  encryptedData,
  decryptedData,
};
