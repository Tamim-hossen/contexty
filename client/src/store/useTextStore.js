import { create } from "zustand";
import { AxiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTextStore = create((set)=>({
    checkingGrammer: false,
    paraphrasing:false,
    chechGrammer:async(text)=>{
        set({checkingGrammer:true})
        try {
            const response =await AxiosInstance.post('/check',{text})
            return response
        } catch (error) {
            console.log(error.response.data.message)
        }finally{
            set({checkingGrammer:false})
        }
    },
    paraphrase:async(text)=>{
        set({paraphrasing:true})
        try {
            const response =await AxiosInstance.post('/paraphrase',{text})
            return response
        } catch (error) {
            console.log(error.response.data.message)
        }finally{
            set({paraphrasing:false})
        }
    }
}))