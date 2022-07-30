import { CryptoAllTable } from "@/models/crypto_table";

class QueryTableApi {
    public getTable: () => Promise<CryptoAllTable> = async () => {
        const data:CryptoAllTable = 
        {
          summary:
          {
            available_count:20,
            occupied_count:10,
            total_count:30,
            today_customer:114,
            total_customer:514
          },
          tables:
          [
            {
              table_id: 1,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 2,
              customer_number: 1,
              table_capacity: 2,
              occupied: '占用'
            },
            {
              table_id: 3,
              customer_number: 2,
              table_capacity: 2,
              occupied: '占用'
            },
            {
              table_id: 4,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 5,
              customer_number: 2,
              table_capacity: 2,
              occupied: '占用'
            },
            {
              table_id: 6,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 7,
              customer_number: 1,
              table_capacity: 2,
              occupied: '占用'
            },
            {
              table_id: 8,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 9,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 10,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 11,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 12,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 13,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 14,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 15,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            },
            {
              table_id: 16,
              customer_number: 0,
              table_capacity: 2,
              occupied: '空闲'
            }
          ]
        }
        

        return Promise.resolve(data); 
    }

}

export const queryTableApi = new QueryTableApi();