import express from "express"
import { isLogin } from "../middleware/Auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controllers/submission.controller.js";


const submissionRoutes = express.Router()


submissionRoutes.get("/get-all-submissions" , isLogin , getAllSubmission);
submissionRoutes.get("/get-submission/:problemId" ,  isLogin , getSubmissionsForProblem)

submissionRoutes.get("/get-submissions-count/:problemId" ,  isLogin , getAllTheSubmissionsForProblem)


export default submissionRoutes;