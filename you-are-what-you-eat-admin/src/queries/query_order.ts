import { CryptoFullOrder,CryptoOrderEdit } from '@/models/crypto_order';
import { GetApi,PostApi } from 'src/utils/requests';

class QueryOrderApi {
  public getOrder: () => Promise<CryptoFullOrder> = async () => {
    try {
      //const r = await (await fetch('http://106.14.212.200:8000/app/api/Order/GetAllOrder')).text();
      //console.log(JSON.parse(r));
      //console.log(data);
      //return JSON.parse(r) as CryptoFullOrder;

      const data = (await GetApi('Order/GetAllOrder')).data;
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }

    //    return Promise.resolve(data);
  };

  public editOrder: (order: CryptoOrderEdit) => Promise<string> = async (order) => {
    const r = await PostApi('Order/PostOrder', order);
    return r.statusText;
  };
}

export const queryOrderApi = new QueryOrderApi();

/*
const data:CryptoFullOrder = 
        {
          summary:
          {
            order_count: 100,
            awaiting_count: 10,
            awaiting_credit: 100,
           processing_count: 25,
           processing_credit: 100,
            completed_count: 30,
            completed_credit: 100,
            payed_count: 35,
           payed_credit: 100,
           total_credit: 100,
           today_credit: 100
          },
          
          orders:[
            {
                order_id : 'sidfh3f7sdh',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'A32',
                order_status: '已支付',
                total_price: 145.14
              },
              {
                order_id : 'hsudfg82dsf',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'B10',
                order_status: '已完成',
                total_price: 98.10
              },
              {
                order_id : '87fehrug2ug',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'C96',
                order_status: '已支付',
                total_price: 39.99
              },
              {
                order_id : '7neygfwurtw',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'A02',
                order_status: '待处理',
                total_price: 105.00
              },
              {
                order_id : '7nysdg8sn3a',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'D27',
                order_status: '制作中',
                total_price: 90.50
              },
              {
                order_id : '283nx8ewyfs',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'A32',
                order_status: '已支付',
                total_price: 9
              },
              {
                order_id : '4783cnyergx',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'A32',
                order_status: '制作中',
                total_price: 9
              },
              {
                order_id : '4nefugng68l',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'A32',
                order_status: '已支付',
                total_price: 9
              },
              {
                order_id : '9snfsd9dfsf',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'A32',
                order_status: '已完成',
                total_price: 9
              },
              {
                order_id : '12hejhfbdys',
                creation_time : '2022-04-27 00:00:00',
                table_id : 'A32',
                order_status: '已支付',
                total_price: 9
              },
        ]
      };
*/
