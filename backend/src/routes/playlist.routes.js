import express from "express"
import { createPlaylist, deletePlaylist, getPlaylist, getPlaylists, updatePlaylist, deleteProblemSFromPlaylist , addProblemsToPlaylist} from "../controllers/playList.controllers.js";
import { isLogin } from "../middleware/Auth.middleware.js"; 

const router = express.Router();

router.post("/create-playlist",isLogin,createPlaylist);

router.post("/add-problems-to-playlist/:playlistId",isLogin,addProblemsToPlaylist);

router.get("/get-playlist/:id",isLogin,getPlaylist);

router.get("/get-all-playlists",isLogin,getPlaylists);

router.put("/update-playlist/:playlistId",isLogin,updatePlaylist);

router.delete("/delete-playlist/:playlistId",isLogin,deletePlaylist);

router.delete("/delete-problems-from-playlist/:playlistId",isLogin,deleteProblemSFromPlaylist);



export default router;