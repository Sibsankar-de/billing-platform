import { setGlobalError } from "@/store/features/globalErrorSlice";
import store from "@/store/store";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const message = err.response?.data?.message;
      store.dispatch(
        setGlobalError({
          status,
          message: message,
        }),
      );
      if (status && status >= 400 && status < 500 && status != 401) {
        toast.error(message || "Something went wrong!");
      }
    }

    return Promise.reject(err);
  },
);

export default api;
