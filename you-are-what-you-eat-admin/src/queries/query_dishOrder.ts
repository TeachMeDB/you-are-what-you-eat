import { CryptoDishOrder,CryptoAllDishOrder } from "@/models/crypto_dishOrder";

class QueryDishOrderApi {
    public getDishOrder: (id: string) => Promise<CryptoAllDishOrder> = async (id) => {
        const data:CryptoAllDishOrder = 
        {
            data:[
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
              ],
              summary:
              {
                total_price:114
              }
        }

        
        try {
            const r = await (await 
                fetch('http://106.14.212.200:8000/app/api/Order/GetOrderDish?order_id='+id)                
                ).text();
            console.log(JSON.parse(r));
            console.log(data);
            return JSON.parse(r) as CryptoAllDishOrder;
        } 
        catch(err) {
            console.log(err);
            return null;
        }

        //return Promise.resolve(data);
    }

}

export const queryDishOrderApi = new QueryDishOrderApi();