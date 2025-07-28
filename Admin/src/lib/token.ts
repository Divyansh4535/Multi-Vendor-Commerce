import Cookie from "js-cookie";
import { tokenTitle } from "./constant";
import { decryptData, encryptData } from "./utils";

export const setToken = (value: string): void => {
  // const encryptedValue = encryptData(value);
  const encryptedValue = value;

  if (!encryptedValue) return;
  console.log("encrypt", encryptedValue);
  Cookie.set(tokenTitle, encryptedValue, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
};

export const getToken = (): string | null => {
  const token = Cookie.get(tokenTitle);
  if (!token) return null;
  const decrypt = decryptData(token);
  console.log("decrypt", decrypt);
  try {
    return token;
  } catch (error) {
    console.error("Failed to decrypt token:", error);
    return null;
  }
};

export const removeToken = (): void => {
  Cookie.remove(tokenTitle, { path: "/" });
};
