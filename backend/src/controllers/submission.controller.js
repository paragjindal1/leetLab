import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

export const getAllSubmission = asyncHandler(async (req, res) => {
    
    const submissions = await db.submission.findMany(
        {
            where: {
                userId: req.user.id
            }
        }
    );

    res.status(200).json(new ApiResponse(200, submissions, "submissions"));
});


export const getSubmissionsForProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    const submissions = await db.submission.findMany({
        where: {
            problemId,
            userId: req.user.id
        }
    });

    res.status(200).json(new ApiResponse(200, submissions, "submissions"));
});

export const getAllTheSubmissionsForProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    const submissions = await db.submission.count({
        where: {
            problemId:problemId,
            

        }
    });

    res.status(200).json(new ApiResponse(200, submissions, "submissions"));
});