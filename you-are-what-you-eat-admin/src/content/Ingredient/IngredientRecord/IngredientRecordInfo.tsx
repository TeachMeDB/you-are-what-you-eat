import { Card } from '@mui/material';
import { IngredientRecordInfo } from '@/models/ingredient_record_info';

import IngredientRecordInfoTable from './IngredientRecordInfoTable';
import { EmployeeInfo } from '@/models/employee_info';
import { IngredientInfo } from '@/models/ingredient_info';

interface IngredientRecordInfoProps {
  list: IngredientRecordInfo[];
  employees: EmployeeInfo[];
  ingredients: IngredientInfo[];
  setIngredientRecordInfoes: any;
}

function AllIngredientRecordInfo({
  list = [],
  ingredients = [],
  employees = [],
  setIngredientRecordInfoes
}: IngredientRecordInfoProps) {
  return (
    <Card>
      <IngredientRecordInfoTable
        ingredientRecordInfoes={list}
        setIngredientRecordInfoes={setIngredientRecordInfoes}
        ingredients={ingredients}
        employees={employees}
      />
    </Card>
  );
}

export default AllIngredientRecordInfo;
