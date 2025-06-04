import { useEffect, useState } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import SignUpPage from './pages/signup';

import {LoginPage} from "./pages/login" 

import { Toaster } from 'react-hot-toast';

import { useAuthStore } from './store/authStore';
import Layout from './layout/Layout';
import AdminRoute from './components/AdminRoute';
import AddProblem from './pages/AddProblem';
import Home from './pages/home';
import { Loader2 } from 'lucide-react';

function App() {
  // AuthUser = null;

  const { authUser , CheckAuthUser, isCheckingAuth} = useAuthStore();

  
  
  useEffect(() => {
    if(!authUser){
        CheckAuthUser();
    }
  },[])


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



  return (
  <>
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element = {<Layout/>}> 
           <Route 
           path={"/"} 
          element={!authUser ? <Navigate to={"/login"} /> : <Home/>} 
           />

       

        <Route 
        path="signup"
        element={
          authUser ? <Navigate to={"/" }/> : <SignUpPage/>}
         />

        <Route 
        path="/login" 
        element={authUser ? <Navigate to={"/"} /> : <LoginPage/>}
         />


         <Route element={<AdminRoute/>}>

         <Route 
         path = '/add-problem'
         element={authUser ? <AddProblem/> : <Navigate to="/login" />}  
         />


         </Route>
         </Route>
      </Routes>
    </div>
  </>
  )
}

export default App
