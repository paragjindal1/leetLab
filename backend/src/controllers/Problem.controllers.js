import { asyncHandler } from "../utils/asyncHandler.js";

import { db } from "../libs/db.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";

import {getJudge0LanguageId,submitBatchToJudge0,submitTokenToJudge0} from "../libs/judge0.js"


 const createProblem = asyncHandler(async (req, res) => {

    // get all the information from req.body

    const {title,
        description,
        difficulty,
        tags,
        examples,
        hints,
        editorial,
        testcases,
        constraints,
        codeSnippets,
        referenceSolutions} = req.body;

    // find user

    const user = await  db.user.findUnique({
        where:{
            id:req.user.id
        }
    })

    // check if its admin or not ;

    if(user.role !== "ADMIN"){
        return res.status(400).json(new ApiError(400,"you dont have access"))
    }




    // seperate languageid and its solution from refreance solution;

    for(const [language,solution] of Object.entries(referenceSolutions) ){
        const languageId = getJudge0LanguageId(language);
        if(!language){
            return res.status(404).json(new ApiError(404," this language is not supported yet"))
        }

        const submission = testcases.map(({input,output})=>({
            language_id:languageId,
            source_code:solution,
            stdin:input,
            expected_output:output

        }))

        console.log(submission);

        // give this refrense solution and test cases to judge0;


        let tokensWithOthers = await submitBatchToJudge0(submission);

        console.log(tokensWithOthers)

        if(!tokensWithOthers){
            return res.status(404).json(new ApiError(404,`${language} code token not produced`))
        }
        console.log(tokensWithOthers)

        let tokens = tokensWithOthers.data.map((t)=>t.token)

        console.log(tokens)

        // send token to judge0  

        let results = await submitTokenToJudge0(tokens)

        console.log(results)

        results.forEach((res)=>{
            if(res.status.id !== 3){
                return res.status(400).json(new ApiError(400,`testcases is not valid`))
            }



        });




    }



    

    // store tokens return by judge0;

    

    // if pass all the test cases then create problem and send succes response if not then send error res

    const createProblem = await db.problem.create({
        data:{

        title,
        description,
        difficulty,
        tags,
        examples,
        hints,
        constraints,
        editorial,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId:user.id

        }
    })

    if(!createProblem){

        return res.status(400).json(new ApiError(400,`problem in creating new problem`))

    }

    res.status(201).json(new ApiResponse(201,createProblem,"table is created"));

    //done

    
    
});

const getProblem = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const problem = await db.problem.findUnique({
        where:{
            id
        }
    })

    if(!problem){
        return res.status(404).json(new ApiError(404,"Problem not found"))
    }

    res.status(200).json(new ApiResponse(200,problem,"problem founded"))
    
});

const getProblems = asyncHandler(async (req, res) => {

    const problems = await db.problem.findMany();

    if(!problems){
        return res.status(404).json(new ApiError(404,"Problem not found"))

    }

    res.status(200).json(new ApiResponse(200,problems,"problem founded"))
    
    
});

const updateProblem = asyncHandler(async (req, res) => {

    const {id} = req.params;

    const problem = await db.problem.findUnique({
        where:{
            id,
        }
    })

    if(!problem){
        return res.status(404).json(new ApiError(404,"Problem not found"))

    }

    const {title,
        description,
        difficulty,
        tags,
        examples,
        hints,
        editorial,
        testcases,
        constraints,
        codeSnippets,
        referenceSolutions} = req.body;

    for(const [language,solution] of Object.entries(referenceSolutions)){

        const languageId = getJudge0LanguageId(language);

        if(!languageId){
            return res.status(404).json(new ApiError(404,"this language is not suppported"))
        }

        const submission = testcases.map(({input,output})=>({
            stdin:input,
            expected_output:output,
            language_id:languageId,
            source_code:solution

        }))

        console.log(submission)

        if(!submission){
            return res.status(404).json(new ApiError(404,"sunmission not found"))
        }

        const tokensWithOthers = await submitBatchToJudge0(submission);

        if(!tokensWithOthers){
            return res.status(404).json(new ApiError(404,"token not found"));


        }

        console.log("token with othher ---- ", tokensWithOthers)

        const tokens = tokensWithOthers.data.map((r)=>r.token)

        console.log("tokens------",tokens)

        const results = await submitTokenToJudge0(tokens);

        console.log(results);

        results.forEach((r)=>{
            if(r.status.id < 3){
                return res.status(404).json(new ApiError(404,"test cases fail"))
            }
        })





    }


    const updatedProblem = await db.problem.update({
        where:{
            id

        },
        data:{
        title,
        description,
        difficulty,
        tags,
        examples,
        hints,
        editorial,
        testcases,
        constraints,
        codeSnippets,
        referenceSolutions,

        }
    })

    res.status(201).json(new ApiResponse(201,updatedProblem,"table is created"));

    
    
});

const deleteProblem = asyncHandler(async (req, res) => {

    const problemId = req.params;

    const deletedProblem = await db.problem.delete({
        where:{
            id:problemId,
        }
    })

    res.status(200).json(new ApiResponse(200,deleteProblem,"problrm is succesfully deleted"))
    
});

const getSolvedProblems = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const getSolvedProblemsData = await db.solvedProblem.findMany({  // can also use user also here
        where:{
            userId
        }
    })

    console.log(getSolvedProblemsData)

    const getSolvedProblemsIds = getSolvedProblemsData.map(({problemId})=>{
        return problemId;
    })

    const solvedProblems = await db.problem.findMany({
        where:{
            id:{
                in:getSolvedProblemsIds
            }
            
        }
    })

    res.status(200).json(new ApiResponse(200,
        solvedProblems
    ,"here is your problem"))
});

    


export {
    createProblem,
    getProblem,
    getProblems,
    updateProblem,
    deleteProblem,
    getSolvedProblems
}