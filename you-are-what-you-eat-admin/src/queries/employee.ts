

import {
    EmployeeDetail,
    EmployeeUpload,
    EmployeeEntity,
} from '@/models/employee'
import { Base64ToData } from '@/utils/image'

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

        employee.avatar=Base64ToData(employee.avatar);
        employee.cover=Base64ToData(employee.cover);

        return (await (PostApi("Employee/PostEmployeeInfo",{
            avatar: employee.avatar.includes("/images/")? null:employee.avatar,
            birthday: employee.birthday,
            cover:   employee.cover.includes("/images/")? null:employee.cover,
            gender:   employee.gender,
            id:  employee.id&&employee.id!=""? employee.id:null,
            name:      employee.name,
            occupation: employee.occupation
        }))).statusText as string
    }

    public deleteEmployee=async (id:string)=>{

        return (await DeleteApi("Employee/DeleteEmployeeInfo",{
            id:id
        })).statusText as string
    }



    
}

export const humanResourceApi = new HumanResourceApi();