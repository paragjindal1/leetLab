import express from "express"
import { isLogin } from "../middleware/Auth.middleware.js";

import { executeCode,runCode } from "../controllers/executeCode.controller.js";

const router = express.Router();


router.post("/Submit-code",isLogin,executeCode);

router.post("/run-code",isLogin,runCode);




export default router;