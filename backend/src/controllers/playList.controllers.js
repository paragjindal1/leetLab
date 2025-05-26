import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../libs/db.js";
import {ApiResponse} from "../utils/apiResponse.js";

export const createPlaylist = asyncHandler(async (req, res) => {

    console.log(req.body);
    const { name,description } = req.body;

    const playlist = await db.playlist.create({
        data:{
            userId:req.user.id,
            name,
            description
        }
    })

    res.status(200).json(new ApiResponse(200,playlist,"playlist created"))
})


export const getPlaylists = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const playlists = await db.playlist.findMany(
        {
            where:{
                userId
            }
        }
    )

    if(playlists.length === 0){
        return res.status(400).json(new ApiError(400,"you have no playlist"))
    }

    res.status(200).json(new ApiResponse(200,playlists,"here is your all playlist"))
})

export const getPlaylist = asyncHandler(async (req, res) => {
    const { id } = req.params;

    

    const playList = await db.playlist.findUnique({
        where:{
            id
        }
    })

    if(!playList){
        return res.status(400).json(new ApiError(400,"this playlist is not existed"))
    }

    

    res.status(200).json(new ApiResponse(200,playList,"here is your playlist"))
})

export const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    const playlist = await db.playlist.findUnique({ where: { id: playlistId } });
    if (!playlist || playlist.userId !== req.user.id) {
        return res.status(403).json(new ApiError(403, "You are not authorized to delete this playlist"));
    }

    const deletdPlaylist = await db.playlist.delete({
        where:{
            id:playlistId
        }
    })

    res.status(200).json(new ApiResponse(200,deletdPlaylist,"playlist deleted succesfully"));
})

export const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;


    const playlist = await db.playlist.findUnique({ where: { id: playlistId } });
    if (!playlist || playlist.userId !== req.user.id) {
        return res.status(403).json(new ApiError(403, "You are not authorized to modify this playlist"));
    }

    const {name,description} = req.body;

    const updatedPlaylist = await db.playlist.update({
        where:{
            id:playlistId
        },
        data:{
            name,
            description

        }
    })

    res.status(200).json(new ApiResponse(200,updatedPlaylist,"playlist updated succesfully"))
})

export const addProblemsToPlaylist = asyncHandler(async (req, res) => {
    const { problemIds } = req.body;
    const { playlistId } = req.params;

    if (!Array.isArray(problemIds)) {
        return res.status(400).json(new ApiError(400, "problemIds should be an array"));
    }

    // Verify playlist exists and belongs to user
    const playlist = await db.playlist.findUnique({ where: { id: playlistId } });
    if (!playlist || playlist.userId !== req.user.id) {
        return res.status(403).json(new ApiError(403, "You are not authorized to modify this playlist"));
    }

    // Check for existing problems
    const existingProblems = await db.problemInPlaylist.findMany({
        where: {
            playlistId,
            problemId: { in: problemIds }
        }
    });
    if (existingProblems.length > 0) {
        return res.status(400).json(new ApiError(400, "Some problems are already in the playlist"));
    }

    // Add problems to playlist
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
        data: problemIds.map((problemId) => ({
            playlistId,
            problemId
        }))
    });

    return res.status(200).json(new ApiResponse(200, problemsInPlaylist, "Problems added to playlist successfully"));
});

export const deleteProblemSFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const {problemIds} = req.body;

    if(!Array.isArray(problemIds)){
        res.status(400).json(new ApiError(400,"problemIds should be in array"))

    }

    const playlist = await db.playlist.findUnique({ where: { id: playlistId } });
    if (!playlist || playlist.userId !== req.user.id) {
        return res.status(403).json(new ApiError(403, "You are not authorized to modify this playlist"));
    }

    const deletedProblemsInPlaylist = await db.problemInPlaylist.deleteMany({
        where:{
            playlistId,
            problemId:{
                in:problemIds
            }
        }
    })

    res.status(200).json(new ApiResponse(200,deletedProblemsInPlaylist,"Problems Deleted SuccesFully From Playlist"))
})