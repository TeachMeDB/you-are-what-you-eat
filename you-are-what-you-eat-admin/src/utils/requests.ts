import axios from 'axios'

import {backendURL} from "./config"


export async function GetApi(url:string,params?:{}){

    return axios.get(url,{
        baseURL:backendURL,
        params:params,
    })
}


export async function PostApi(url:string,body:{}){
    return axios.post(url,body,{
        baseURL:backendURL
    });
}


export async function DeleteApi(url:string,params?:{}){
    return axios.delete(url,{
        baseURL: backendURL,
        params: params,
    })
}