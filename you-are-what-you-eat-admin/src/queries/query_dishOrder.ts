import { CryptoDishOrder } from "@/models/crypto_dishOrder";

class QueryDishOrderApi {
    public getDishOrder: (id: string) => Promise<CryptoDishOrder[]> = async (id) => {
        const data:CryptoDishOrder[] = [
          {
            dish_order_id : "283nx8ewyfs",
            order_id: id,
            dish_id: "迎宾红茶",
            final_payment: 8.10,
            dish_status: '已完成'
        },
        {
            dish_order_id : "283nx8ewyfd",
            order_id: id,
            dish_id: "迎宾红茶",
            final_payment: 8.10,
            dish_status: '制作中'
        },
        {
            dish_order_id : "283nx8ewyfe",
            order_id: id,
            dish_id: "迎宾红茶",
            final_payment: 8.10,
            dish_status: '已完成'
        },
        {
            dish_order_id : "283nx8ewyff",
            order_id: id,
            dish_id: "迎宾红茶",
            final_payment: 8.10,
            dish_status: '待处理'
        },
        {
            dish_order_id : "283nx8ewyfg",
            order_id: id,
            dish_id: "迎宾红茶",
            final_payment: 8.10,
            dish_status: '已完成'
        },
        ];

        return Promise.resolve(data);
    }

}

export const queryDishOrderApi = new QueryDishOrderApi();