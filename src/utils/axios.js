import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://resume-matcher-pi.vercel.app/",
  withCredentials: true,
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);
