import CryptoJS from "crypto-js";
import { secretKey } from "./constant";

export const encryptData = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, secretKey)?.toString();
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
};

export const decryptData = (data: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);

    // First try UTF-8 decoding
    try {
      return bytes?.toString(CryptoJS.enc.Utf8);
    } catch (utf8Error) {
      // Fallback to Latin1 if UTF-8 fails
      return bytes?.toString(CryptoJS.enc.Latin1);
    }
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error(
      "Failed to decrypt data. Possible invalid key or corrupted data."
    );
  }
};
