import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:4000",
  withCredentials: true, // 쿠키 저장을 위해 필수
};
const instance: AxiosInstance = axios.create(axiosConfig);

export default instance;
