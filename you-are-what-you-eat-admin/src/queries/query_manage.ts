import { ManageInfo } from '@/models/manage_info';

class QueryManageApi {
  public getManageList: () => Promise<ManageInfo[]> = async () => {
    try {
      // return [
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '001',
      //     assets_type: '001',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '002',
      //     assets_type: '002',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '003',
      //     assets_type: '003',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '004',
      //     assets_type: '004',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '005',
      //     assets_type: '005',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '006',
      //     assets_type: '006',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '007',
      //     assets_type: '007',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      // ];
      const r = await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/GetAssetRecord')
      ).text();
      const content = JSON.parse(r) || {};
      return (content.data || []) as ManageInfo[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public addManage: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/manages/Asset/PostAddAssetRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
          })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public updateManage: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/PostUpdateAssetRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
          })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public deleteManage: (id: any) => Promise<string> = async (id) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/manages/' + id, { method: 'DELETE' })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

}

export const queryManageApi = new QueryManageApi();
