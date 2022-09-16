import React from "react";
import {Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props:any) => {

    const useAuth=()=>{
        const user=localStorage.getItem('loggedUser')
        console.log(user)
        if(user){
          return true
        } else {
          return false
        }
      }

      const auth = useAuth()

    return auth ? <Outlet /> : <Navigate to="/" />
    
}


export default ProtectedRoute;