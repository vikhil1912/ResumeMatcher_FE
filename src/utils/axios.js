import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://resume-matcher-pi.vercel.app/api/",
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
