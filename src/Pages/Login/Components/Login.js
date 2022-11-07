import React, { useState } from "react";
import '../Styles/Login.css'
import { Button, Card, CardBody, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../Api/LoginRequest";
import { Loader } from "../../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { Toaster } from "../../../components/Toaster/Toster";
import { LoginUser } from "../../../redux/Reducers/UserReducer";

const INITIAL_STATE = {
    username: "",
    email: "",
    password: ""
}

const ERROR_INITIAL_STATE = {
    username: false,
    email: false,
    password: false
}
function Login() {
    const [formData, setFormData] = useState({ ...INITIAL_STATE })
    const [errorState, setErrorState] = useState({ ...ERROR_INITIAL_STATE })
    const [LoadingFlag, setLoadingFlag] = useState(false)
    const [toasterFlag, setToasterFlag] = useState({flag:false,message:""})

    const [Count, setCount] = useState(22)

    const navigate = useNavigate()
    let dispatch=useDispatch()
    /* onchange funciton */
    const handleChange = (e) => {
        try{
            setCount(Count+2)
            let value = e.target.value
            let name = e.target.name
            setErrorState({ ...ERROR_INITIAL_STATE })
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }))
        }catch(error){
            console.log(error)
        }
    }

    /* submit funciton */
    const handleSubmit = (e) => {
        try{
            e.preventDefault()
            let validateEmail = /^[a-z]{1}[a-zA-Z0-9]+@[a-z]+.+[a-z]{2,3}$/g;
            if (formData.username === "") {
                setErrorState((prevState) => ({
                    ...prevState,
                    username: true,
                    email: false,
                    password: false,
                }))
            } else if (formData.email === "" || !formData.email.match(validateEmail)) {
                setErrorState((prevState) => ({
                    ...prevState,
                    email: true,
                    username: false,
                    password: false,
                }))
            }
            else if (formData.password === "" || formData.password.length < 8) {
                setErrorState((prevState) => ({
                    ...prevState,
                    password: true,
                    username: false,
                    email: false,
                }))
            }else{
                setLoadingFlag(true)
                let obj={
                        email: "eve.holt@reqres.in",
                        password: "cityslicka"
                }
                LoginRequest(obj).then(response=>{
                    console.log(response)
                    if(response.status===200){
                        let userToken=response.data.token
                        localStorage.setItem('token',userToken)
                        localStorage.setItem('user',JSON.stringify(formData))
                        let obj={...formData, token:userToken}
                        dispatch(LoginUser(obj))
                        setToasterFlag({flag:true,message:"Login Successfull!"})
                        setTimeout(()=>{
                            window.location.replace('/dashboard')
                            // navigate('/dashboard')
                        },1000)
                    }
                }).catch(error=>{
                    console.log(error)
                    setToasterFlag({flag:true,message:"Something went wrong!"})
                }).finally(()=>{
                    setLoadingFlag(false)

                })
            }
        }catch(error){
            console.log(error)
        }

    }


    return (
        <>
            {LoadingFlag && <Loader />}
            {toasterFlag.flag && <Toaster message={toasterFlag.message} color={toasterFlag.message==="Login Successfull!" ? "info" : "danger"}/>}
            <div className="d-flex justify-content-center mt-5" style={{opacity:LoadingFlag && '0.6'}}>

                <Card style={{ width: '30rem' }}>
                    <CardBody>
                        <h3 className="text-center">LOGIN</h3>
                        <Input
                            value={formData.username ?? ""}
                            onChange={handleChange}
                            invalid={errorState.username}
                            placeholder="Enter Username"
                            type="text"
                            name="username"
                            className="textfields mt-3"
                        />
                        {errorState.username && <span className="errorMessage">Invalid username</span>}
                        <Input
                            value={formData.email ?? ""}
                            onChange={handleChange}
                            invalid={errorState.email}
                            placeholder="Enter Email"
                            type="text"
                            name="email"
                            className={`textfields mt-3 `}
                        />
                        {errorState.email && <span className="errorMessage">Invalid Email</span>}
                        <Input
                            value={formData.password ?? ""}
                            onChange={handleChange}
                            invalid={errorState.password}
                            placeholder="Enter Password"
                            type="password"
                            name="password"
                            className={`textfields mt-3`}
                        />
                        {errorState.password && <span className="errorMessage">Password must be atleast 8 characters</span>}

                        <div className="text-center">
                            <Button outline color="secondary" onClick={handleSubmit} className=" mt-3 w-50">Submit</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
export default Login