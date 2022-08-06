import axios from 'axios'

import {backendURL,access_token} from "./config"






export const GetApi=async (url:string,params?:{})=>{

    return axios.get(url,{
        baseURL:backendURL,
        params:{
            ...params,
            token:access_token
        }}
        )
}


export const PostApi = async (url:string,body:{})=>{
    return axios.post(url,{
        ...body,
        token:access_token
    },{
        baseURL:backendURL
    });
}


export async function DeleteApi(url:string,params?:{}){
    return axios.delete(url,{
        baseURL: backendURL,
        params:{
            ...params,
            token:access_token
        }
    })
}