import express from "express";
import { isLogin } from "../middleware/Auth.middleware.js";
import { createProblem, deleteProblem, getProblem, getProblems, getSolvedProblems, updateProblem } from "../controllers/Problem.controllers.js";


const router =  express.Router();

router.post("/create-problem",isLogin,createProblem);

router.get("/get-problem/:id",isLogin,getProblem);

router.get("/get-all-problems",isLogin,getProblems);

router.put("/update-problem/:id",isLogin,updateProblem);

router.delete("/delete-problem/:id",isLogin,deleteProblem);

router.get("/get-solved-problems",isLogin,getSolvedProblems);



export default router;