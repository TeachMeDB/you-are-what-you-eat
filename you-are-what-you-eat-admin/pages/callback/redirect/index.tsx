import { useRefMounted } from "@/hooks/useRefMounted";
import { EmployeeDetail } from "@/models/employee";
import { humanResourceApi } from "@/queries/employee";
import GlobalConfig from "@/utils/config";
import { Typography } from "@mui/material";
import { addDays, format } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";


function CallbackRedirect() {

    const router = useRouter();


    const isMountedRef = useRefMounted();

    const [user, setUser] = useState<EmployeeDetail>(null);


    const getAllData = useCallback(async () => {

        let user_data = await humanResourceApi.getEmployeeDetail(null);

        setUser(user_data);

    }, [isMountedRef])



    useEffect(() => {

        GlobalConfig.setFrontendURL(window.location.host)

        let link = localStorage.getItem("token");

        GlobalConfig.setAccessToken(link);


        console.log(GlobalConfig.getAccessToken());

        getAllData().then(()=>{

            

            router.replace({ pathname: '/human_resource/organization' })



        }).catch(()=>{

            alert("您不是经历添加的用户，请联系经理添加您的信息");

            window.localStorage.clear();

            router.replace("/");

        })

    })


    return (
        <>

        </>

    )



}


export default CallbackRedirect;