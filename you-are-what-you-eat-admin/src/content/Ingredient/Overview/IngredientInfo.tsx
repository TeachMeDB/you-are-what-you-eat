import { Card } from '@mui/material';

import IngredientInfoTable from './IngredientInfoTable';
import { IngredientInfo } from '@/models/ingredient_info';

interface IngredientInfoProps {
  list: IngredientInfo[];
  setIngredientInfoes: any;
}

function AllIngredientInfoes(props) {
  const { list = [], setIngredientInfoes }: IngredientInfoProps = props;
  return (
    <Card>
      <IngredientInfoTable
        ingredientInfoes={list}
        setIngredientInfoes={setIngredientInfoes}
      />
      {/*<IngredientInfoTable ingredientInfoes={ingredientInfoes} />*/}
    </Card>
  );
}

export default AllIngredientInfoes;
