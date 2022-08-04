import { AssetInfo } from '@/models/asset_info';

class QueryAssetApi {
  public getAssetList: (assets_type: string) => Promise<AssetInfo[]> = async (assets_type = '') => {
    try {
      // return [
      //   {
      //     assets_id: '001',
      //     assets_type: '可乐',
      //     assets_status: 12,
      //     employee_id: 2,
      //     employee_name: 'Carl',
      //   },
      //   {
      //     assets_id: '002',
      //     assets_type: '山羊',
      //     assets_status: 10,
      //     employee_id: 3,
      //     employee_name: 'Carl',
      //   },
      //   {
      //     assets_id: '003',
      //     assets_type: '兔子',
      //     assets_status: 10,
      //     employee_id: 4,
      //     employee_name: 'Carl',
      //   },
      //   {
      //     assets_id: '004',
      //     assets_type: '山药',
      //     assets_status: 10,
      //     employee_id: 5,
      //     employee_name: 'Carl',
      //   },
      //   {
      //     assets_id: '005',
      //     assets_type: '土豆丝',
      //     assets_status: 10,
      //     employee_id: 4,
      //     employee_name: 'Carl',
      //   },
      //   {
      //     assets_id: '006',
      //     assets_type: '荷兰豆',
      //     assets_status: 10,
      //     employee_id: 3,
      //     employee_name: 'Carl',
      //   },
      // ];
      const r = await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/GetAsset?assets_type=' + assets_type)
      ).text();
      const content = JSON.parse(r) || {};
      return (content.data || []) as AssetInfo[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public addAsset: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/PostAddAsset', {
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

  public updateAsset: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/PostUpdateAsset', {
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

  public deleteAsset: (id: any) => Promise<string> = async (id) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/DeleteAsset?id=' + id, { method: 'DELETE', })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

}

export const queryAssetApi = new QueryAssetApi();
