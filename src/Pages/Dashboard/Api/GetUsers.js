import axios from "axios"
import { connectionString } from "../../../config/ConnectionString"

export const GetUsers=()=>{
    try{
        return new Promise((resolve,reject)=>{
            axios.get(`${connectionString}api/users`).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    }catch(error){

    }
}