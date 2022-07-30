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
          summary2:
  {          
    series: [
      {
      name: '1人客',
      data: [44, 55, 41, 67, 22, 43]
    }, 
    {
      name: '2人客',
      data: [13, 23, 20, 8, 13, 27]
    }, 
    {
      name: '4人客',
      data: [11, 17, 15, 15, 21, 14]
    }, 
    {
      name: '6人客',
      data: [21, 7, 25, 13, 22, 8]
    }
    ],
    options: 
    {
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
      responsive: 
      [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: 
      {
        bar: {
          horizontal: false,
          borderRadius: 10
        },
      },
      xaxis: 
      {
        type: 'datetime',
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
          '01/05/2011 GMT', '01/06/2011 GMT'
        ],
      },
      legend: 
      {
        position: 'right',
        offsetY: 40
      },
      fill: 
      {
        opacity: 1
      }
    },    
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