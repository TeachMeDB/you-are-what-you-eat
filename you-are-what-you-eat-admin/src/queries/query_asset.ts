import { AssetInfo } from '@/models/asset_info';

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlcnRfdWJ1M3ZpIiwidHlwIjoiSldUIn0.eyJvd25lciI6Im9yZ2FuaXphdGlvbl9kYmtzIiwibmFtZSI6IjEwMDEiLCJjcmVhdGVkVGltZSI6IjIwMjItMDctMjhUMDE6NDk6MDBaIiwidXBkYXRlZFRpbWUiOiIiLCJpZCI6ImZlYWM5YWRhLWFlNzYtNDIyZC05Y2Y0LTcyYjFlZGVmZjYxNiIsInR5cGUiOiJub3JtYWwtdXNlciIsInBhc3N3b3JkIjoiIiwicGFzc3dvcmRTYWx0IjoiIiwiZGlzcGxheU5hbWUiOiIxMDAxIiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJhdmF0YXIiOiJodHRwczovL2Nhc2Jpbi5vcmcvaW1nL2Nhc2Jpbi5zdmciLCJwZXJtYW5lbnRBdmF0YXIiOiIiLCJlbWFpbCI6IiIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJwaG9uZSI6IiIsImxvY2F0aW9uIjoiIiwiYWRkcmVzcyI6W10sImFmZmlsaWF0aW9uIjoiIiwidGl0bGUiOiIiLCJpZENhcmRUeXBlIjoiIiwiaWRDYXJkIjoiIiwiaG9tZXBhZ2UiOiIiLCJiaW8iOiIiLCJyZWdpb24iOiIiLCJsYW5ndWFnZSI6IiIsImdlbmRlciI6IiIsImJpcnRoZGF5IjoiIiwiZWR1Y2F0aW9uIjoiIiwic2NvcmUiOjIwMDAsImthcm1hIjowLCJyYW5raW5nIjozLCJpc0RlZmF1bHRBdmF0YXIiOmZhbHNlLCJpc09ubGluZSI6ZmFsc2UsImlzQWRtaW4iOmZhbHNlLCJpc0dsb2JhbEFkbWluIjpmYWxzZSwiaXNGb3JiaWRkZW4iOmZhbHNlLCJpc0RlbGV0ZWQiOmZhbHNlLCJzaWdudXBBcHBsaWNhdGlvbiI6ImFwcGxpY2F0aW9uX2Ria3MiLCJoYXNoIjoiIiwicHJlSGFzaCI6IiIsImNyZWF0ZWRJcCI6IiIsImxhc3RTaWduaW5UaW1lIjoiIiwibGFzdFNpZ25pbklwIjoiIiwiZ2l0aHViIjoiIiwiZ29vZ2xlIjoiIiwicXEiOiIiLCJ3ZWNoYXQiOiIiLCJ1bmlvbklkIjoiIiwiZmFjZWJvb2siOiIiLCJkaW5ndGFsayI6IiIsIndlaWJvIjoiIiwiZ2l0ZWUiOiIiLCJsaW5rZWRpbiI6IiIsIndlY29tIjoiIiwibGFyayI6IiIsImdpdGxhYiI6IiIsImFkZnMiOiIiLCJiYWlkdSI6IiIsImFsaXBheSI6IiIsImNhc2Rvb3IiOiIiLCJpbmZvZmxvdyI6IiIsImFwcGxlIjoiIiwiYXp1cmVhZCI6IiIsInNsYWNrIjoiIiwic3RlYW0iOiIiLCJiaWxpYmlsaSI6IiIsIm9rdGEiOiIiLCJkb3V5aW4iOiIiLCJjdXN0b20iOiIiLCJ3ZWJhdXRobkNyZWRlbnRpYWxzIjpudWxsLCJsZGFwIjoiIiwicHJvcGVydGllcyI6e30sInNjb3BlIjoib3BlbmlkIiwiaXNzIjoiaHR0cHM6Ly8xMjAuNTUuNDcuNTU6ODAwMSIsInN1YiI6ImZlYWM5YWRhLWFlNzYtNDIyZC05Y2Y0LTcyYjFlZGVmZjYxNiIsImF1ZCI6WyI4MjczN2FhYzhlYzg5MzE1YzIyMCJdLCJleHAiOjE2NjA5MTY4MjIsIm5iZiI6MTY2MDMxMjAyMiwiaWF0IjoxNjYwMzEyMDIyfQ.XMbHuS77qKK-QL_My_2bI8mN3wLLvVo5QaXR3jasNz64F7DFpmVZ23nLh5Y-hX8XABCfvqTUQXm1ys6JMrD3SP91BzpMPRhYilWOWESRdbdjjtV8ktQWeeK8KGgXND6TsrLnS8_fwnN9Wivdtez7ZnkUzRz_fgKuLtKwU6xJXoniOyo4bxsCec_UHWBhTe-a9PU7evHy_d193CD36UnuN567n7JhEFCanYWz0q8c32l2p96K7N5u_NFyMb82CJOQkSTH6roZtTnT3ZvRSOeY3rZeLLuIoxPq35hzEP3W1-QBz0V35w8T5dQiviEEbDjZnwsgwdv5pNxqm2CionQWyJ9SCqCanAYAgeCZZ6d-im2jlmnw4chP7ehMxvzatvu3c1JCj63ZrRYeam-J1lbBsDbIK-xBULphCIuGRuVHtLiGV9zZyB1yfU9L5SmJ0Kd3Wola9XuRTLYtONLtD2bmBXoD1faPgo8NMainVdJnp5sk5U-E6ArUPLh9L5zl_7G3ttg-E47smrHCDWAGg-cOLRdcYobkSXdr_zXge_V5Gaebmgi-khbZSDN951WcT21dHp1WurMgepNH7ibTp63sXhL2TeFazRxUY_Auo0IkVMaHq4JhsG1ZUh3qVkpMRF02p3TjPTRiXFGqSzpTdEcuJYFiwFJWf2XPFStJlXp4DgQ';

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
          fetch(`http://106.14.212.200:8000/app/api/Asset/GetAsset?assets_type=${assets_type}&token=${token}`)
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

  public addAsset: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/PostAddAsset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...params, token }),
          })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public addAssetRepair: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/PostAddAssetRepair', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...params, token }),
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
            body: JSON.stringify({ ...params, token }),
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
          fetch(`http://106.14.212.200:8000/app/api/Asset/DeleteAsset?id=${id}&token=${token}`, { method: 'DELETE' })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

}

export const queryAssetApi = new QueryAssetApi();
