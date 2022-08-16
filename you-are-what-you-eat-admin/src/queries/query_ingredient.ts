import { IngredientInfo } from '@/models/ingredient_info';
import GlobalConfig from '@/utils/config';

class QueryIngredientApi {
  public getIngredientList: (ingrName: string) => Promise<IngredientInfo[]> =
    async (ingrName = '') => {
      try {
        const r = await (
          await fetch(
            GlobalConfig.getBackendURL()+`/Ingredient/GetIngredient?ingrName=${ingrName}&token=${GlobalConfig.getAccessToken()}`
          )
        ).text();
        const content = JSON.parse(r) || {};
        return (content.data || []).map((val) => ({
          ingr_id: val.ingrId,
          ingr_name: val.ingrName,
          ingr_type: val.ingrType,
          ingr_description: val.ingrDescription
        })) as IngredientInfo[];
      } catch (err) {
        console.log(err);
        return null;
      }
    };

  public addIngredient: (params: any) => Promise<string> = async (params) => {
    try {
      return await (
        await fetch(
          GlobalConfig.getBackendURL()+'/Ingredient/PostAddIngredient',
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

  public updateIngredient: (params: any) => Promise<string> = async (
    params
  ) => {
    try {
      return await (
        await fetch(
          GlobalConfig.getBackendURL()+'/Ingredient/PostUpdateIngredient',
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

  public deleteIngredient: (id: any) => Promise<string> = async (id) => {
    try {
      return await (
        await fetch(
          GlobalConfig.getBackendURL()+`/Ingredient/DeleteIngredient?id=${id}&token=${GlobalConfig.getAccessToken()}`,
          { method: 'DELETE' }
        )
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

export const queryIngredientApi = new QueryIngredientApi();
