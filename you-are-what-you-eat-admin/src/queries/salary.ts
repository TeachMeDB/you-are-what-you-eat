import { PayrollUpload, PayrollEntity, Salary } from '@/models/employee';

import { GetApi, PostApi } from '@/utils/requests';

class SalaryApi {
  public getSalary = async () => {
    return (await GetApi('Salary/GetSalaryInfo')).data as Salary[];
  };

  public getPayroll = async () => {
    return (await GetApi('Salary/GetSalaryRecord')).data as PayrollEntity[];
  };

  public postPayroll = async (payroll: PayrollUpload) => {
    return (await PostApi('Salary/PostOneSalaryRecord', payroll))
      .statusText as string;
  };
}

export const salaryApi = new SalaryApi();
