import GlobalConfig from "@/utils/config";
import { Typography } from "@mui/material";
import { addDays, format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function Callback(){



    useEffect(()=>{

        GlobalConfig.setFrontendURL(window.location.host)

        let callback=window.location.hash;

        let link=/#token=(.*)\?state=application_dbks&token_type=bearer/.exec(callback)[1]

        localStorage.clear();

        localStorage.setItem("token",link);
        localStorage.setItem("token_expire_time",format(addDays(Date.now(),5),"yyyy-MM-dd HH:mm:ss"))

        GlobalConfig.setAccessToken(link);
        

        console.log(GlobalConfig.getAccessToken());

        window.parent.location.replace("/callback/redirect");

    })


    return (
        <>



        </>

    )



}


export default Callback;