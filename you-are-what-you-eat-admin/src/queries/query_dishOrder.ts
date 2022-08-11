import { CryptoDishOrder, CryptoAllDishOrder } from '@/models/crypto_dishOrder';
import { GetApi } from 'src/utils/requests';

class QueryDishOrderApi {
  public getDishOrder: (id: string) => Promise<CryptoAllDishOrder> = async (
    id
  ) => {
    try {
      /*const r = await (await 
                fetch('http://106.14.212.200:8000/app/api/Order/GetOrderDish?order_id='+id)                
                ).text();*/
      //console.log(JSON.parse(r));
      //console.log(data);

      const data = (
        await GetApi('Order/GetOrderDish', {
          order_id: id
        })
      ).data;

      //const data=JSON.parse(r)

      const dishes = await Promise.all(
        data.data.map(async (d) => {
          return {
            dish_name: (
              await GetApi('Dishes/GetDishNameById', {
                dish_id: d.dish_id
              })
            ).data,
            dish_order_id: d.dish_order_id,
            order_id: d.order_id,
            dish_id: d.dish_id,
            final_payment: d.final_payment,
            dish_status: d.dish_status
          };
        })
      );

      const opt_data: CryptoAllDishOrder = {
        data: dishes,
        summary: data.summary
      };

      return opt_data as CryptoAllDishOrder;
    } catch (err) {
      console.log(err);
      return null;
    }

    //return Promise.resolve(data);
  };
}

export const queryDishOrderApi = new QueryDishOrderApi();

/*
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

 */
