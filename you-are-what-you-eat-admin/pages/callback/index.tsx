import GlobalConfig from "@/utils/config";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function Callback(){

    const router=useRouter();


    useEffect(()=>{

        GlobalConfig.setFrontendURL(window.location.host)

        let callback=window.location.hash;

        let link=/#token=(.*)\?state=application_dbks&token_type=bearer/.exec(callback)[1]

        localStorage.clear();

        localStorage.setItem("token",link);


        GlobalConfig.setAccessToken(link);
        

        console.log(GlobalConfig.getAccessToken());

        router.replace({pathname: '/human_resource/organization'})

    })


    return (
        <>



        </>

    )



}


export default Callback;