import { EmployeeInfo } from '@/models/employee_info';
import GlobalConfig from '@/utils/config';


class QueryEmployeeApi {
  public getEmployeeList: () => Promise<EmployeeInfo[]> = async () => {
    try {
      const r = await (
        await fetch(
          GlobalConfig.getBackendURL()+`/Employee/GetEmployeeInfo2?token=${GlobalConfig.getAccessToken()}`
        )
      ).text();
      return (JSON.parse(r) || []) as EmployeeInfo[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export const queryEmployeeApi = new QueryEmployeeApi();
