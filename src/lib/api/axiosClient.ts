import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { configURL } from "utils/constants";

const config: AxiosRequestConfig = {
    baseURL: configURL.baseURL,
    withCredentials: false,
    timeout: 1000 * 300,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
};

const axiosClient: AxiosInstance = axios.create(config);

axiosClient.interceptors.request.use((req) => {
    const user = localStorage.getItem("user");
    if (user) {
      const token = JSON.parse(user).token;
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;
