import axios from "axios";
import { getToken } from "./token";
import { apis } from "./constant";

const apiInstance = axios.create({
  baseURL: apis.admin,
  timeout: 1000,
});
const publicInstance = axios.create({
  baseURL: apis.admin,
  timeout: 1000,
});

apiInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const handleError = (error: any, action: string) => {
  const message =
    error?.response?.data?.message ||
    error.message ||
    "Unexpected error occurred";
  console.error(`${action} failed:`, message);
  throw new Error(message);
};

const getCall = async (endPoint: string) => {
  try {
    const response = await apiInstance.get(endPoint);
    return response.data;
  } catch (error) {
    handleError(error, "GET");
  }
};

const postCall = async (endPoint: string, payload: Record<string, any>) => {
  try {
    const response = await apiInstance.post(endPoint, payload);
    return response.data;
  } catch (error) {
    handleError(error, "POST");
  }
};

const putCall = async (endPoint: string, payload: Record<string, any>) => {
  try {
    const response = await apiInstance.put(endPoint, payload);
    return response.data;
  } catch (error) {
    handleError(error, "PUT");
  }
};

const patchCall = async (endPoint: string, payload: Record<string, any>) => {
  try {
    const response = await apiInstance.patch(endPoint, payload);
    return response.data;
  } catch (error) {
    handleError(error, "PATCH");
  }
};

const deleteCall = async (endPoint: string) => {
  try {
    const response = await apiInstance.delete(endPoint);
    return response.data;
  } catch (error) {
    handleError(error, "DELETE");
  }
};

const postFormCall = async (endPoint: string, payload: FormData) => {
  try {
    const response = await apiInstance.post(endPoint, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, "POST FORM DATA");
  }
};

const postCallNoToken = async (
  endPoint: string,
  payload: Record<string, any>
) => {
  try {
    const response = await publicInstance.post(endPoint, payload);
    return response.data;
  } catch (error) {
    handleError(error, "POST NO TOKEN");
  }
};

export {
  getCall,
  postCall,
  putCall,
  patchCall,
  deleteCall,
  postFormCall,
  postCallNoToken,
};
