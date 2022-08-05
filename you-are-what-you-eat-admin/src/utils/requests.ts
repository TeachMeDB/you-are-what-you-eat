import axios from 'axios'

import {backendURL} from "./config"


export const GetApi=async (url:string,params?:{})=>{

    return axios.get(url,{
        baseURL:backendURL,
        params:params,
    })
}


export const PostApi = async (url:string,body:{})=>{
    return axios.post(url,body,{
        baseURL:backendURL
    });
}
