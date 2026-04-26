import { asyncHandler } from "../utils/asyncHandler"

import { db } from "../libs/db.js";

const getTotalSolvedProblem = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const getSolvedProblemsData = await db.problem.groupBy({  // can also use user also here
        by: ["difficulty"],
        _count: {
            id:true
        }
    })


    





})