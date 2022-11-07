import { Navigate } from "react-router-dom"


export function ProtectedRoute(Component){
    return()=>{
        let token=localStorage.getItem('token')
        if(!token){
            return <Navigate to="/"/>
        }
        return <Component />
    }
}