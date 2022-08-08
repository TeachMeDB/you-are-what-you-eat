

import {
    EmployeeDetail,
    EmployeeUpload,
    EmployeeEntity,
} from '@/models/employee'

import {DeleteApi, GetApi,PostApi} from "@/utils/requests"


class HumanResourceApi {


    public getEmployees= async ()=>{
        return (await (GetApi("Employee/GetAllEmployeeInfo"))).data as EmployeeEntity[]
    }

    public  getEmployeeDetail=async(id:string)=>{
        return (await (GetApi("Employee/GetOneEmployeeInfo",
        {
            id:id
        }))).data as EmployeeDetail
    }

    public postEmployee=async (employee:EmployeeUpload)=>{
        return (await (PostApi("Employee/PostEmployeeInfo",employee))).statusText as string
    }

    public deleteEmployee=async (id:string)=>{

        return (await DeleteApi("Employee/DeleteEmployeeInfo",{
            id:id
        })).statusText as string
    }

    ///



    
}

export const humanResourceApi = new HumanResourceApi();