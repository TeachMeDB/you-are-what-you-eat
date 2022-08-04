import { EmployeeInfo } from '@/models/employee_info';

class QueryEmployeeApi {
  public getEmployeeList: () => Promise<EmployeeInfo[]> = async () => {
    try {
      const r = await (await
          fetch('http://106.14.212.200:8000/app/api/Employee/GetEmployeeInfo2')
      ).text();
      return (JSON.parse(r) || []) as EmployeeInfo[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

}

export const queryEmployeeApi = new QueryEmployeeApi();
