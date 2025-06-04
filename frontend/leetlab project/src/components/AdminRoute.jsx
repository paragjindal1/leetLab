import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AdminRoute = () => {

     const { authUser , CheckAuthUser, isCheckingAuth} = useAuthStore();

    console.log(isCheckingAuth);

    


    if(isCheckingAuth){
        return (
    <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
             <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading, please wait...</p>
         </div>
        </div> 
    );
    }
    console.log(authUser)
    if(authUser?.role !== "ADMIN"){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}

export default AdminRoute;
