import {
  CryptoTable,
  CryptoAllTable,
  CryptoAutoAssignTable
} from '@/models/crypto_table';
import { CryptoOrder } from '@/models/crypto_order';

import { GetApi, PostApi } from '@/utils/requests';

class QueryTableApi {
  public getTable: () => Promise<CryptoAllTable> = async () => {
    try {
      //const r = await (await fetch('http://106.14.212.200:8000/app/api/Table/GetAllTable')).text();
      //console.log(JSON.parse(r));
      //console.log(data);
      //let rawData: CryptoAllTable =JSON.parse(r) as CryptoAllTable;
      const rawData = (await GetApi('Table/GetAllTable'))
        .data as CryptoAllTable;
      rawData.summary2.options = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          type: 'text',
          categories: rawData.summary2.options.xaxis.categories
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      };
      let tmp = rawData.summary.available_count;

      //后端的available_count和occupied_count返回反了，这里正过来
      rawData.summary = {
        available_count: rawData.summary.occupied_count,
        occupied_count: tmp,
        today_customer: rawData.summary.today_customer,
        total_count: rawData.summary.total_count,
        total_customer: rawData.summary.total_customer
      };

      return rawData;
      //return JSON.parse(r) as CryptoAllTable;
    } catch (err) {
      console.log(err);
      return null;
    }

    //  return Promise.resolve(data);
  };

  /*public setTable= async (table:CryptoTable)=>{
      return (await (PostApi("Table/PostTableStatus",table))).statusText as string
  }*/

  public setTable: (table: CryptoTable) => Promise<string> = async (table) => {
    const r = await PostApi('Table/PostTableStatus', table);
    return r.statusText;
  };

  public getQueueTable = async (customer_number: number) => {
    return (
      await GetApi('Table/GetSeat', {
        customer_number: customer_number
      })
    ).data as CryptoAutoAssignTable;
  };

  public getOrderOnTable = async (table: number) => {
    return (
      await GetApi('Order/GetOrderByTable', {
        table: table
      })
    ).data as CryptoOrder;
  };
}

export const queryTableApi = new QueryTableApi();
