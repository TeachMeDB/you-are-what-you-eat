import GlobalConfig from "@/utils/config";
import { Typography } from "@mui/material";
import { addDays, format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function CallbackRedirect(){

    const router=useRouter();


    useEffect(()=>{

        GlobalConfig.setFrontendURL(window.location.host)

        let link=localStorage.getItem("token");

        GlobalConfig.setAccessToken(link);
        

        console.log(GlobalConfig.getAccessToken());

        router.replace({pathname: '/human_resource/organization'})

    })


    return (
        <>

        </>

    )



}


export default CallbackRedirect;