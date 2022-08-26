import { AssetInfo } from '@/models/asset_info';
import GlobalConfig from '@/utils/config';

class QueryAssetApi {
  public getAssetList: (assets_type: string) => Promise<AssetInfo[]> = async (
    assets_type = '',
  ) => {
    try {
      const r = await (
        await fetch(
          GlobalConfig.getBackendURL() + `/Asset/GetAsset?assets_type=${assets_type}&token=${GlobalConfig.getAccessToken()}`,
        )
      ).text();
      const content = JSON.parse(r) || [];
      return (content.data || []).map(val => ({
        ...val,
        repair: (val.repair || []).map(item => ({
          ...item,
          longitude: parseFloat(item.longitude),
          latitude: parseFloat(item.latitude),
        })),
      }));
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public addAsset: (params) => Promise<Response> = async (params) => {
    return await fetch(GlobalConfig.getBackendURL() + '/Asset/PostAddAsset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params, token: GlobalConfig.getAccessToken() }),
    });
  };

  public addAssetRepair: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch(GlobalConfig.getBackendURL() + '/Asset/PostAddAssetRepair', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...params, token: GlobalConfig.getAccessToken() }),
          })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public updateAsset: (params) => Promise<Response> = async (params) => {
    return await fetch(
      GlobalConfig.getBackendURL() + '/Asset/PostUpdateAsset',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...params, token: GlobalConfig.getAccessToken() }),
      },
    );
  };

  public deleteAsset: (id: any) => Promise<string> = async (id) => {
    try {
      return await (
        await fetch(
          GlobalConfig.getBackendURL() + `/Asset/DeleteAsset?id=${id}&token=${GlobalConfig.getAccessToken()}`,
          { method: 'DELETE' },
        )
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export const queryAssetApi = new QueryAssetApi();
