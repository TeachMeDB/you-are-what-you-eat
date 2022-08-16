import { IngredientRecordInfo } from '@/models/ingredient_record_info';
import GlobalConfig from '@/utils/config';

class QueryIngredientRecordApi {
  public getIngredientRecordList: () => Promise<IngredientRecordInfo[]> = async () => {
    try {
      const r = await (await
          fetch(GlobalConfig.getBackendURL()+`/Ingredient/GetIngredientRecord?token=${GlobalConfig.getAccessToken()}`)
      ).text();
      console.log(r, ' <-- r');
      const content = JSON.parse(r) || {};
      return (content.data || []) as IngredientRecordInfo[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public addIngredientRecord: (params: any) => Promise<string> = async (
    params
  ) => {
    try {
      return await (
        await fetch(
          GlobalConfig.getBackendURL()+'/Ingredient/PostAddIngredientRecord',
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

  public updateIngredientRecord: (params: any) => Promise<string> = async (
    params
  ) => {
    try {
      return await (
        await fetch(
          GlobalConfig.getBackendURL()+'/Ingredient/PostUpdateIngredientRecord',
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

  public deleteIngredientRecord: (id: any) => Promise<string> = async (id) => {
    try {
      return await (
        await fetch(
          GlobalConfig.getBackendURL()+`/Ingredient/DeleteIngredientRecord?id=${id}&token=${GlobalConfig.getAccessToken()}`,
          { method: 'DELETE' }
        )
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export const queryIngredientRecordApi = new QueryIngredientRecordApi();
