

import {
    PayrollUpload,
    PayrollEntity,
    Salary
} from '@/models/employee'

import {GetApi,PostApi} from "@/utils/requests"


class SalaryApi {

    public async getSalary(){
        return (await (GetApi("Salary/GetSalaryInfo"))).data as Salary[];
    }


    public async getPayroll(){
        return (await (GetApi("Salary/GetSalaryRecord"))).data as PayrollEntity[];
    }

    public async postPayroll(payroll:PayrollUpload){
        return (await (PostApi("Salary/PostOneSalaryRecord",payroll))).statusText as string
    }

}

export const salaryApi = new SalaryApi();