import { db } from "../libs/db.js";
import { getJudge0LanguageId ,getLanguageByLanguageId, submitBatchToJudge0, submitTokenToJudge0} from "../libs/judge0.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/apiResponse.js";


export const executeCode = asyncHandler(async (req, res) => {    // or submitCode

    const {problemId,sourceCode,languageId} = req.body;

    const problem = await db.problem.findUnique({
        where:{
            id:problemId
        }
    })

    const user = req.user.id;

    const language = getLanguageByLanguageId(languageId);

    console.log(problem.testcases);

    console.log(sourceCode)

    const submission = problem.testcases.map(({input,output}) => {
        return {
            language_id:languageId,
            source_code:sourceCode[language],
            stdin:input,
            expected_output:output

        }
    })

    console.log(submission);

    const tokenWithOthers = await submitBatchToJudge0(submission);

    console.log(tokenWithOthers);

    const tokens = tokenWithOthers.data.map((r)=>r.token);

    const results = await submitTokenToJudge0(tokens);

    console.log(results);

    // res.status(200).json(new ApiResponse(200,results,"results"))

    const input = problem.testcases.map(({input})=>input);

    const expected_output = problem.testcases.map(({output})=>output);

    const testcases = results.map((result,index)=>({
        
        
        sourceCode  :  sourceCode,
        language    :  language,
        stdin       :  input[index],
        stdout      :  result.stdout.trim(),
        stderr      :  result.stderr,
        compileOutput: result.compile_output,
        status      :  result.status.description, 
        memory      :  result.memory.toString(),
        time        :  result.time,
        expected_output : expected_output[index],
        passed : (result.status.id === 3),
        testCase : index+1

    }))

    console.log(testcases)

    

    const allPassed = results.every((result)=>result.status.id === 3)

    const submit = await db.submission.create({
        data:{
            problemId:problemId,      
            userId :req.user.id,
            sourceCode  :  sourceCode,
            language    :  language,
            stdin       :  input.join("\n"),
            stdout: testcases.some(t => t.stdout)
                     ? JSON.stringify(testcases.map(t => t.stdout))
                    : null,

            stderr: testcases.some(t => t.stderr)
                    ? JSON.stringify(testcases.map(t => t.stderr))
                    : null,

            compileOutput: testcases.some(t => t.compile_output)
                            ? JSON.stringify(testcases.map(t => t.compile_output))
                            : null,

            status      :  allPassed ? "Accepted" : "Wrong Answer", 
            memory      :  testcases.some((t)=>t.memory)?
                            JSON.stringify(testcases.map((t)=>t.memory)):
                            null,
            time        :  testcases.some((t)=>t.time)?
                            JSON.stringify(testcases.map((t)=>t.time)):
                            null,
        }
    })

    if(allPassed){
        await db.solvedProblem.upsert({
            where: {
                problemId_userId: {
                  userId:req.user.id,
                  problemId,
                }},
            update:{},
            create:{
                userId:req.user.id,
                problemId
            }
        })
    }


    const testCaseResults = testcases.map((result) => ({
        submissionId: submit.id,
        testCase: result.testCase,
        passed: result.passed,
        stdout: result.stdout,
        expected: result.expected_output,
        stderr: result.stderr,
        compileOutput: result.compileOutput,
        status: result.status,
        memory: result.memory,
        time: result.time,
      }));

   const testcasestables = await db.testCase.createMany({
    data:testCaseResults
   })
    console.log(testcasestables)

    



    res.status(200).json(new ApiResponse(200,submit,"submission done succesful"));

    


    
})

export const runCode = asyncHandler(async (req, res) => {
    const {problemId,sourceCode,languageId} = req.body;

    const problem = await db.problem.findUnique({
        where:{
            id:problemId
        }
    })

    const user = req.user.id;

    const language = getLanguageByLanguageId(languageId);

    console.log(problem.testcases);

    console.log(sourceCode)

    const submission = problem.testcases.map(({input,output}) => {
        return {
            language_id:languageId,
            source_code:sourceCode[language],
            stdin:input,
            expected_output:output

        }
    })

    console.log(submission);

    const tokenWithOthers = await submitBatchToJudge0(submission);

    console.log(tokenWithOthers);

    const tokens = tokenWithOthers.data.map((r)=>r.token);

    const results = await submitTokenToJudge0(tokens);

    console.log(results);

    // res.status(200).json(new ApiResponse(200,results,"results"))

    const input = problem.testcases.map(({input})=>input);

    const expected_output = problem.testcases.map(({output})=>output);

    const testcases = results.map((result,index)=>({
        
        
        sourceCode  :  sourceCode,
        language    :  language,
        stdin       :  input[index],
        stdout      :  result.stdout.trim(),
        stderr      :  result.stderr,
        compileOutput: result.compile_output,
        status      :  result.status.description, 
        memory      :  result.memory.toString(),
        time        :  result.time,
        expected_output : expected_output[index],
        passed : (result.status.id === 3),
        testCase : index+1

    }))

    res.status(200).json(new ApiResponse(200,testcases,"here is your result"));
    
})



export const addTestCase = asyncHandler(async (req, res) => {
    const {problemId,stdin,stdout} = req.body;
})
