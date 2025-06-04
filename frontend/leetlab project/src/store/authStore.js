import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast"





export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isLoginingIn: false,
  isSigningUp: false,
  isLoginingOut: false,


  Logout : async () => {
    set({ isLoginingOut: true });
    try {
      const res = await axiosInstance.get("auth/logout");
      if (res.status === 200) {
        set({ authUser: null });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    } finally {
      set({ isLoginingOut: false });
    }
  },

  CheckAuthUser: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("auth/me");
      console.log(res)
      if (res.status === 200) {
        set({ authUser: res.data.data.user });
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch user");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      if (res.status === 200) {
        set({ authUser: res.data.data });
        console.log("login auth ", res.data.data)
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/register", data);
      if (res.status === 201) {
        set({ authUser: res.data.data }); // Assuming it returns a user
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
