import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import {toast} from "react-hot-toast";



export const  useProblemStore = create((set)=>({

    problems: [],
    problemById:null,
    solvedProblesByUser:[],
    isProblemsLoading:false,
    isproblemByIdLoading:false,


    getAllProblem:async()=>{
        set({isProblemsLoading:true});
        try{
            const res = await axiosInstance.get("/problem/get-all-problems");
            console.log(res);
            set({problems:res.data.data});
        }catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to fetch problems");
        }finally{
            set({isProblemsLoading:false});
        }
    },

    getProblemById:async(id)=>{
        set({isproblemByIdLoading:true});
        try{
            const res = await axiosInstance.get(`/problem/get-problem/${id}`);
            console.log(res);
            set({problemById:res.data.data});
            toast.success(res.data.data.message);
        }catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to fetch problem");
        }finally{
            set({isproblemByIdLoading:false});
        }
    },

    getAllSolvedProblemByUser:async(userId)=>{
        set({isProblemsLoading:true});
        try{
            const res = await axiosInstance.get(`/problem/get-solved-problems/${userId}`);
            console.log(res);
            set({solvedProblesByUser:res.data.data});
        }catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to fetch problems");
        }finally{
            set({isProblemsLoading:false});
        }
    }


})) 