
import {
    CurOrder,
    Dish,
    DishStatusUpload,
    OrderStatusUpload
} from '@/models/cur_order'

import { GetApi, PostApi } from "@/utils/requests"


class CurOrderApi {

    public async getCurOrder(dish?: Dish[], order_id?: string, order_status?: string) {
        return (await (GetApi("/Dishes/OrderList", {
            dish: dish,
            order_id: order_id,
            order_status: order_status
        }))).data as CurOrder[];
    }
    public updateDishStatus = async (dishStatusUpload: DishStatusUpload) => {
        return (await (PostApi("/Dishes/UpdateOrderStatus", {
            dishStatusUpload
        }))).statusText as string
    }
    public updateOrderStatus = async (orderStatusUpload: OrderStatusUpload) => {
        return (await (PostApi("/Dishes/UpdateOrderStatus", {
            orderStatusUpload
        }))).statusText as string
    }


}

export const curOrderApi = new CurOrderApi();