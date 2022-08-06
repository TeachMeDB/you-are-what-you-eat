import { Card } from '@mui/material';
import { IngredientRecordInfo } from '@/models/ingredient_record_info';

import IngredientRecordInfoTable from './IngredientRecordInfoTable';
import { EmployeeInfo } from '@/models/employee_info';
import { AssetInfo } from '@/models/asset_info';

interface IngredientRecordInfoProps {
  list: IngredientRecordInfo[];
  employees: EmployeeInfo[];
  ingredients: AssetInfo[];
  setIngredientRecordInfoes: any;
}

function AllIngredientRecordInfo({ list = [], ingredients = [], employees = [], setIngredientRecordInfoes }: IngredientRecordInfoProps) {
  return (
    <Card>
      <IngredientRecordInfoTable ingredientRecordInfoes={list} setIngredientRecordInfoes={setIngredientRecordInfoes} ingredients={ingredients} employees={employees} />
    </Card>
  );
}

export default AllIngredientRecordInfo;
