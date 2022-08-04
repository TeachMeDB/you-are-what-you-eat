import { IngredientRecord } from '@/models/ingredient_record';

class QueryIngredientRecordApi {
  public getIngredientRecordList: () => Promise<IngredientRecord[]> = async () => {
    try {
      const r = await (await
          fetch('http://106.14.212.200:8000/app/api/Ingredient/GetIngredientRecord')
      ).text();
      const content = JSON.parse(r) || {};
      return (content.data || []) as IngredientRecord[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public addIngredientRecord: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Ingredient/PostAddIngredientRecord', {
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

  public updateIngredientRecord: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Ingredient/PostUpdateIngredientRecord', {
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

  public deleteIngredientRecord: (id: any) => Promise<string> = async (id) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Ingredient/DeleteIngredientRecord?id=' + id, { method: 'DELETE' })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

}

export const queryIngredientRecordApi = new QueryIngredientRecordApi();
