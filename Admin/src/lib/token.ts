import Cookie from "js-cookie";
import {  tokenTitle } from "./constant";
import { decryptData, encryptData } from "./utils";

export const setToken = (value: string): void => {
  const encryptedValue = encryptData(value);
  if (!encryptedValue) return;

  Cookie.set(tokenTitle, encryptedValue, {
    expires: 1, 
    secure: true,
    sameSite: "Strict",
  });
};

export const getToken = (): string | null => {
  const token = Cookie.get(tokenTitle);
  if (!token) return null;

  try {
    return decryptData(token);
  } catch (error) {
    console.error("Failed to decrypt token:", error);
    return null;
  }
};

export const removeToken = (): void => {
  Cookie.remove(tokenTitle);
  window.location.href = "/login";
};
