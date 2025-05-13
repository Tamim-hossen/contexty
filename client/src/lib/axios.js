import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: ['http://localhost:5000/api','https://contexty.onrender.com'],
    withCredentials:true,
})