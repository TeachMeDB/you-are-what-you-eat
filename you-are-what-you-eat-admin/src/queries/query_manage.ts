import { ManageInfo } from '@/models/manage_info';

class QueryManageApi {
  public getManageList: () => Promise<ManageInfo[]> = async () => {
    try {
      const r = await (await
          fetch('http://106.14.212.200:8000/app/api/manages')
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
          fetch('http://106.14.212.200:8000/app/api/manages/add', {
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
          fetch('http://106.14.212.200:8000/app/api/manages/update', {
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
