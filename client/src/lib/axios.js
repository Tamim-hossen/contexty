import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    withCredentials:true,
})