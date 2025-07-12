import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "ECOM";

export const encryptData = (text: string) => {
  const value = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return value;
};
export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
