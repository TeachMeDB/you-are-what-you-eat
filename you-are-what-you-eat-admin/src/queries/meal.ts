
import {
    MealInfo
} from '@/models/meal_info'

import { GetApi } from "@/utils/requests"


class MealInfoApi {

    public async getMealInfo(description?: string, dis_name?: string, id?: string, price?: number) {
        return (await (GetApi("/Dishes", {
            description: description,
            dis_name: dis_name,
            id: id,
            price: price,
        }))).data as MealInfo[];
    }
}

export const mealInfoApi = new MealInfoApi();