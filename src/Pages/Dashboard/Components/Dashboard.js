import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { Loader } from "../../../components/Loader/Loader";
import { fetchUsers } from "../../../redux/Reducers/DashboardReducer";
import ErrorResponse from "./ErrorResponse";
import { LoginUser } from "../../../redux/Reducers/UserReducer";
function Dashboard() {

    const [LoadingFlag, setLoadingFlag] = useState(false)
    const dispatch=useDispatch()
    const reducerDashboard=useSelector(state=>state.dashboard)
    const user=JSON.parse(localStorage.getItem('user'))
    const navigate=useNavigate()

    /* fetch api for dashboard */
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    /* logout funciton */
    const logoutFunction=()=>{
        try{
            setLoadingFlag(true)
            localStorage.removeItem("token")
            window.location.replace('/')
        }catch(error){
            console.log(error)
        }
    }
    
    return (
        <>
            {reducerDashboard.status==="loading" && <Loader />}
            {reducerDashboard.error && <ErrorResponse />}
            <div className="dashboardMian" style={{opacity:LoadingFlag && '0.6'}}>
                <div className="d-flex justify-content-between m-4">
                    <h3>Dashboard</h3>
                    <div className="d-flex justify-content-between" >
                        <span className="mx-3 mt-2">{user?.email}</span>
                        <Button outline color="secondary" onClick={logoutFunction}>Logout</Button>
                    </div>
                </div>

                <div className="m-2">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reducerDashboard && reducerDashboard?.userArray?.map((item,index)=>{
                                return (
                                <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.email}</td>
                                </tr>
                                )
                            })}


                        </tbody>
                    </Table>

                </div>
            </div>
        </>
    )
}
export default Dashboard