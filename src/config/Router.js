import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Login=React.lazy(()=>import("../Pages/Login/Components/Login"))
const Dashboard=React.lazy(()=>import("../Pages/Dashboard/Components/Dashboard"))

function RouterComponent(){

    const getUserId=localStorage.getItem('token')
    const currentPath=window.location.pathname.length===1 ? "/dashboard" : window.location.pathname
    return(
        <>
        <Routes>
            <Route path="/" element={getUserId ? <Navigate to={currentPath}/> : <Login />} />
            <Route path="/dashboard" element={AuthChecker(getUserId,<Dashboard/>)} />
        </Routes>
        </>
    )
}

const AuthChecker=(userId,component)=>{
    try{
        return userId ? component : <Navigate to="/"/>
    }catch(error){
        console.log(error)
    }
}

export default RouterComponent


