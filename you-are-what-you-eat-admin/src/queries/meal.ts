
import {
    MealInfo,
    MealInfoUpload,
    MealInfoAdd
} from '@/models/meal_info'
import { Base64ToData } from '@/utils/image';

import { GetApi, PostApi, DeleteApi } from "@/utils/requests"


class MealInfoApi {

    public async getMealInfo(description?: string, dis_name?: string, id?: string, price?: number, tags?: string[]) {
        return (await (GetApi("/Dishes", {
            description: description,
            dis_name: dis_name,
            id: id,
            price: price,
            tags: tags
        }))).data as MealInfo[];
    }
    public addMeal = async (meal: MealInfoAdd) => {

        meal.picture=Base64ToData(meal.picture);
        return (await (PostApi("/Dishes/AddDish", meal))).statusText as string
    }


    public updateMeal = async (meal: MealInfoUpload) => {
        return (await (PostApi("/Dishes/UpdateDish", meal))).statusText as string
    }

    public delMeal = async (id: string) => {
        return (await (DeleteApi("/Dishes/DelDishById", { id }))).statusText as string
    }
}

export const mealInfoApi = new MealInfoApi();