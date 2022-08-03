import { Card } from '@mui/material';
import { IngredientInfo } from '@/models/ingredient_info';

import IngredientInfoTable from './IngredientInfoTable';

function AllIngredientInfoes() {
  const ingredientInfoes: IngredientInfo[] = [
    {
      ingr_id: '001',
      ingr_name: '包菜',
      ingr_type: 10,
      ingr_description: '有机包菜，纯天然，不打农药',
    },
    {
      ingr_id: '002',
      ingr_name: '猪肉',
      ingr_type: 11,
      ingr_description: '黑猪肉，口感好，味道香',
    },
    {
      ingr_id: '003',
      ingr_name: '牛肉',
      ingr_type: 11,
      ingr_description: '小黄牛肉，肉质鲜嫩，烹饪方便',
    },
    {
      ingr_id: '004',
      ingr_name: '西葫芦',
      ingr_type: 10,
      ingr_description: '水生种植，鲜嫩多汁',
    },
    {
      ingr_id: '005',
      ingr_name: '西蓝花',
      ingr_type: 10,
      ingr_description: '颜色翠绿，口感好',
    },
    {
      ingr_id: '006',
      ingr_name: '荷兰豆',
      ingr_type: 10,
      ingr_description: '粒粒鲜嫩，口感独特',
    },

  ];

  return (
    <Card>
      <IngredientInfoTable ingredientInfoes={ingredientInfoes} />
    </Card>
  );
}

export default AllIngredientInfoes;
