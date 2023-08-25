import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true, // 쿠키 저장을 위해 필수
};
const instance: AxiosInstance = axios.create(axiosConfig);

export default instance;
