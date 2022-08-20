



import authorization from "@/utils/authorization";
import GlobalConfig from "@/utils/config";
import { height } from "@mui/system";
import { useEffect, useState } from "react";



const LoginPage=()=>{

    const [flag,setFlag]=useState(false);

    useEffect(()=>{
        GlobalConfig.setFrontendURL(window.location.host);

        setFlag(true);
    })


    return (
        (flag)&&(<iframe src={authorization.getSigninUrl(GlobalConfig.getFrontendURL())} style={{
            height:"100vh",
            width:"100%",
            border:"none"
        }}>

        </iframe>)
    )
}



export default LoginPage;