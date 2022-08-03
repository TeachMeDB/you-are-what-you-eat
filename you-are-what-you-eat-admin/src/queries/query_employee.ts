import { EmployeeInfo } from '@/models/employee_info';

class QueryEmployeeApi {
  public getEmployeeList: () => Promise<EmployeeInfo[]> = async () => {
    try {
      return [
        {
          employee_id: 1,
          employee_name: '张三',
        },
        {
          employee_id: 2,
          employee_name: '李四',
        },
        {
          employee_id: 3,
          employee_name: '王武',
        },
        {
          employee_id: 4,
          employee_name: '赵六',
        },
        {
          employee_id: 5,
          employee_name: '鬼脚七',
        },
      ];
      const r = await (await
          fetch('http://106.14.212.200:8000/app/api/employees')
      ).text();
      const content = JSON.parse(r) || {};
      return (content.data || []) as EmployeeInfo[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

}

export const queryEmployeeApi = new QueryEmployeeApi();
