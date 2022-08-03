
import {
    CurOrder,
    Dish
} from '@/models/cur_order'

import { GetApi } from "@/utils/requests"


class CurOrderApi {

    public async getCurOrder(dish?: Dish[], order_id?: string, order_status?: string) {
        return (await (GetApi("/Dishes/OrderList", {
            dish: dish,
            order_id: order_id,
            order_status: order_status
        }))).data as CurOrder[];
    }
}

export const curOrderApi = new CurOrderApi();