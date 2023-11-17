import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cookies, cookiesOptions, useAuth } from "../AuthProvider/AuthProvider";

// export const baseURL = "https://the-winter-brand.vercel.app/api/v1"
// export const baseURL = "http://localhost:5000/api/v1"
export const baseURL = import.meta.env.VITE_Server;
const axiosSecure = axios.create({
  baseURL: baseURL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = cookies.get("accessToken");
      if (token) {
        config.headers.authorization = token;
      }
      return config;
    });
  }, []);
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (user?.email) {
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 500)
        ) {
          axios
            .post(baseURL + "/login-user", {
              email: user.email,
            })
            .then((res) => {
              if (res?.data?.accessToken) {
                cookies.set(
                  "accessToken",
                  res.data.accessToken,
                  cookiesOptions
                );
              }
            });
        }
      }
    }
  );

  return { axiosSecure };
};

export default useAxiosSecure;
