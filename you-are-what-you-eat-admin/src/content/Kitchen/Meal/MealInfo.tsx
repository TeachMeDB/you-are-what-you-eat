import { Card } from '@mui/material';
import { MealInfo } from '@/models/meal_info';

import React, { useState } from 'react';

import MealInfoTable from './MealInfoTable'

function AllMealInfoes(mealinfoes) {

    let arr = Object.values(mealinfoes);
    console.log(arr[0].mealinfo);
    return (
        <Card>
            <MealInfoTable mealInfoes={arr[0].mealinfo} />
        </Card>
    );
}

export default AllMealInfoes;
