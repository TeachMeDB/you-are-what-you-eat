import { Card } from '@mui/material';
import { MealInfo } from '@/models/meal_info';



import MealInfoTable from './MealInfoTable'

function AllMealInfoes() {
    const mealInfoes: MealInfo[] = [
        {
            id: "001",
            DishName: "水煮包菜",
            Price: 10,
            Description: "原汁原味包菜水煮而成"
        },
        {
            id: "002",
            DishName: "水煮西葫芦",
            Price: 10,
            Description: "原汁原味西葫芦水煮而成"
        },
        {
            id: "002",
            DishName: "水煮西葫芦",
            Price: 10,
            Description: "原汁原味西葫芦水煮而成"
        },
        {
            id: "002",
            DishName: "水煮西葫芦",
            Price: 10,
            Description: "原汁原味西葫芦水煮而成"
        },
        {
            id: "002",
            DishName: "水煮西葫芦",
            Price: 10,
            Description: "原汁原味西葫芦水煮而成"
        },
        {
            id: "006",
            DishName: "水煮西葫芦",
            Price: 10,
            Description: "原汁原味西葫芦水煮而成"
        },

    ];

    return (
        <Card>
            <MealInfoTable mealInfoes={mealInfoes} />
        </Card>
    );
}

export default AllMealInfoes;
