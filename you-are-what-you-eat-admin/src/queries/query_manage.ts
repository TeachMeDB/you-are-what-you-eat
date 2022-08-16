import { ManageInfo } from '@/models/manage_info';
import GlobalConfig from '@/utils/config';

class QueryManageApi {
  public getManageList: () => Promise<ManageInfo[]> = async () => {
    try {
      
      const r = await (
        await fetch(
          GlobalConfig.getBackendURL()+`/Asset/GetAssetRecord?token=${GlobalConfig.getAccessToken()}`
        )
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
          fetch(GlobalConfig.getBackendURL()+'/Asset/PostAddAssetRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...params, token:GlobalConfig.getAccessToken() })
          }
        )
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public updateManage: (params: any) => Promise<string> = async (params) => {
    try {
      return await (
        await fetch(
          GlobalConfig.getBackendURL()+'/Asset/PostUpdateAssetRecord',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...params, token:GlobalConfig.getAccessToken() })
          }
        )
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export const queryManageApi = new QueryManageApi();
