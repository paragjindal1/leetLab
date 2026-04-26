import {create} from "zustand";
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";



export const useExecutionStore = create((set)=>({
    isExecuting:false,
    submission:null,

    setSubmissionNull:()=>set({submission:null}),

       executeCode:async ( sourceCode, languageId, problemId)=>{
        try {
            set({isExecuting:true});
            console.log("Submission:",JSON.stringify({
                sourceCode,
                languageId,
                problemId
            }));
            const res = await axiosInstance.post("/execute/Submit-code" , { sourceCode, languageId, problemId });

            console.log(res)

            set({submission:res.data.data});
      
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error executing code",error);
            toast.error("Error executing code");
        }
        finally{
            set({isExecuting:false});
        }
    }
}))