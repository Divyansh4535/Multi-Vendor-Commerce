import { decryptData, encryptData } from "./encryption";
import Cookies from "js-cookie";

const base =
  process.env.NEXT_PUBLIC_API_URL || "https://ecom-store-gw9w.onrender.com/api";

export const urlConfig = {
  baseUrl: base + "/web",
};

export const TokenTitle = "ECOM_WEB_STORE";

export const getToken = () => {
  const token = Cookies.get(TokenTitle);
  if (!token) {
    return null;
  } else {
    let value = decryptData(token);
    return value;
  }
};

export const setToken = (value: string) => {
  const encryptedToken = encryptData(value);
  if (encryptedToken) {
    Cookies.set(TokenTitle, encryptedToken, {
      expires: 1,
    });
  }
};
export const removeToken = () => {
  Cookies.remove(TokenTitle);
  console.log("Token Removed from your system");
};
