import { IngredientInfo } from '@/models/ingredient_info';

class QueryIngredientApi {
  public getIngredientList: (ingrName: string) => Promise<IngredientInfo[]> = async (ingrName = '') => {
    try {
      const r = await (await
          fetch('http://106.14.212.200:8000/app/api/Ingredient/GetIngredient?ingrName=' + ingrName)
      ).text();
      const content = JSON.parse(r) || {};
      return (content.data || []) as IngredientInfo[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public addIngredient: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Ingredient/PostAddIngredient', {
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

  public updateIngredient: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Ingredient/PostUpdateIngredient', {
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

  public deleteIngredient: (id: any) => Promise<string> = async (id) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Ingredient/DeleteIngredient?id=' + id, { method: 'DELETE' })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

}

export const queryIngredientApi = new QueryIngredientApi();
