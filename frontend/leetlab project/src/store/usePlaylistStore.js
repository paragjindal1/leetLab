import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import {toast} from "react-hot-toast";  


export const usePlaylistStore = create((set)=>({

    playLists:[],
    currentPlaylist:null,
    isloading:false,
    error:null,

    getPlaylists: async () => {
        set({isloading:true});
        try {
            const res = await axiosInstance.get(`/playlist/get-all-playlists`);

            console.log(res.data.data)
            set({playLists:res.data.data});
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to fetch playlists");
        }finally{
            set({isloading:false});
        }
    },

    getCurrentPlaylist: async (id) => {
        set({isloading:true});
        try {
            const res = await axiosInstance.get(`/playlist/get-playlist/${id}`);
            set({currentPlaylist:res.data.data});
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to fetch playlist");
        }finally{
            set({isloading:false});
        }
    },

    createPlaylist: async(playlistDetals)=>{
        set({isloading:true});
        try {
            const res = await axiosInstance.post(`/playlist/create-playlist`,playlistDetals);
            toast.success(res.data.message);
            set((state)=>({playLists:[...state.playLists,res.data.data]}));
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create playlist");
        }finally{
            set({isloading:false});
        }
    },

    removeProblemFromPlayList:async(playlistId,problemId)=>{
        set({isloading:true});
        try {
            const res = await axiosInstance.delete(`/playlist/delete-problems-from-playlist/${playlistId}`,problemId);
            toast.success(res.data.message);
            if(get().currentPlaylist?.id === playlistId){
                await get().getCurrentPlaylist(playlistId);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to remove problem from playlist");
        }finally{
            set({isloading:false});
        }
    },

    addProblemToPlaylist:async(playlistId,problemIds)=>{
        set({isloading:true});
        try {
            console.log(problemIds)
            const res = await axiosInstance.post(`/playlist/add-problems-to-playlist/${playlistId}`,{problemIds:problemIds});
            toast.success(res.data.message);
            if(get().currentPlaylist?.id === playlistId){
                await get().getCurrentPlaylist(playlistId);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to add problem to playlist");
        }finally{
            set({isloading:false});
        }
    },


    deletePlaylist:async(playlistId)=>{
        set({isloading:true});
        try {
            const res = await axiosInstance.delete(`/playlist/delete-playlist/${playlistId}`);
            toast.success(res.data.message);
            await get().getPlaylists();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to delete playlist");
        }finally{
            set({isloading:false});
        }
    },
}))
