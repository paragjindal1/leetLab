import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";


export const UseSubmissionStore = create((set)=>({
    submissions:[],
    submission:null,
    submissionCount:0,
    isLoading:false,


    getAllSubmissions:async()=>{
        try {
            set({isLoading:true});
            const res = await axiosInstance.get(`/submission/get-all-submissions`);
            console.log("submissions",res)
            set({submissions:res.data.data});
        } catch (error) {
            console.log(error);
            
            toast.error(error?.response?.data?.message || "Failed to fetch submissions");
            throw new error(error);
        }finally{
            set({isLoading:false});
            
        }
    },

    getSubmissionByProblem:async(id)=>{
        try {
            set({isLoading:true});
            const res = await axiosInstance.get(`/submission/get-submission/${id}`);
             console.log("submission",res)
            set({submission:res.data.data});
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to fetch submissions");
        }finally{
            set({isLoading:false});
            
        }
    },

    getSubmissionCount:async(id)=>{
        try {
            set({isLoading:true});
            const res = await axiosInstance.get(`/submission/get-submissions-count/${id}`);
            set({submissionCount:res.data.data});
        } catch (error) {
            
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to fetch submissions");
            throw new error(error);
        }finally{
            set({isLoading:false});
            
        }
    },


}))