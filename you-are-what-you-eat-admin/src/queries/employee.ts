

import {
    EmployeeDetail,
    EmployeeUpload,
    EmployeeEntity,
} from '@/models/employee'

import {GetApi,PostApi} from "@/utils/requests"


class HumanResourceApi {


    public async getEmployees(){
        return (await (GetApi("Employee/GetAllEmployeeInfo"))).data as EmployeeEntity[]
    }

    public async getEmployeeDetail(id:string){
        return (await (GetApi("Employee/GetOneEmployeeInfo",
        {
            id:id
        }))).data as EmployeeDetail
    }

    public async postEmployee(employee:EmployeeUpload){
        return (await (PostApi("Employee/PostEmployeeInfo",employee))).statusText as string
    }

    // public async deleteEmployee(id:string){
    //     return (await (DeleteApi("Employee/DeleteEmployeeInfo/1014"))).data
    // }

    
}

export const humanResourceApi = new HumanResourceApi();