
import React from "react";
import { Loader2 } from "lucide-react";

import { Outlet } from "react-router-dom";    
import NavBar from "../components/navBar";
import { useAuthStore } from "../store/authStore";

const Layout = () => {
    const {authUser,isCheckingAuth} = useAuthStore();
    
        console.log("check auth", isCheckingAuth);
    
    
    return (
        <div>
        <NavBar />
        <Outlet />
        </div>
        
    );
};

export default Layout;