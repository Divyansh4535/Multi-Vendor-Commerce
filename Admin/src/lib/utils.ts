import CryptoJS from "crypto-js";
import { secretKey } from "./constant";

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (data: string): string => {
  return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
};
