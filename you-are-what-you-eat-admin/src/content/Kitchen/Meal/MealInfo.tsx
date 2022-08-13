import { Card } from '@mui/material';
import { MealInfo } from '@/models/meal_info';


import React, { useState } from 'react';

import MealInfoTable from './MealInfoTable'


function AllMealInfoes() {




  return (
    <Card>
      <MealInfoTable />
    </Card>
  );

}

export default AllMealInfoes;
