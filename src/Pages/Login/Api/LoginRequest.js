import axios from "axios"
import { connectionString } from "../../../config/ConnectionString"

export const LoginRequest=(obj)=>{
    try{
        return new Promise((resolve,reject)=>{
            axios.post(`${connectionString}api/login`,obj).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    }catch(error){

    }
}