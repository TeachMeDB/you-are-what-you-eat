import { Card } from '@mui/material';
import { IngredientInfo } from '@/models/ingredient_info';

import IngredientInfoTable from './IngredientInfoTable';

function AllIngredientInfoes() {
  const ingredientInfoes: IngredientInfo[] = [
    {
      IngrId: '001',
      IngrName: '包菜',
      IngrType: 10,
      IngrDescription: '有机包菜，纯天然，不打农药',
    },
    {
      IngrId: '002',
      IngrName: '猪肉',
      IngrType: 11,
      IngrDescription: '黑猪肉，口感好，味道香',
    },
    {
      IngrId: '003',
      IngrName: '牛肉',
      IngrType: 11,
      IngrDescription: '小黄牛肉，肉质鲜嫩，烹饪方便',
    },
    {
      IngrId: '004',
      IngrName: '西葫芦',
      IngrType: 10,
      IngrDescription: '水生种植，鲜嫩多汁',
    },
    {
      IngrId: '005',
      IngrName: '西蓝花',
      IngrType: 10,
      IngrDescription: '颜色翠绿，口感好',
    },
    {
      IngrId: '006',
      IngrName: '荷兰豆',
      IngrType: 10,
      IngrDescription: '粒粒鲜嫩，口感独特',
    },

  ];

  return (
    <Card>
      <IngredientInfoTable ingredientInfoes={ingredientInfoes} />
    </Card>
  );
}

export default AllIngredientInfoes;
