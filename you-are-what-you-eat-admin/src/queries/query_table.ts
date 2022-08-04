import { CryptoAllTable} from "@/models/crypto_table";

class QueryTableApi {
    public getTable: () => Promise<CryptoAllTable> = async () => {
        
        

        try {
          const r = await (await fetch('http://106.14.212.200:8000/app/api/Table/GetAllTable')).text();
          //console.log(JSON.parse(r));
          //console.log(data);
          let rawData: CryptoAllTable =JSON.parse(r) as CryptoAllTable;          
          rawData.summary2.options=
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
              type: 'text',
              categories: rawData.summary2.options.xaxis.categories,
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
          }

          return rawData;
          //return JSON.parse(r) as CryptoAllTable;
      } 
      catch(err) {
          console.log(err);
          return null;
      }

      //  return Promise.resolve(data); 
    }

  
}

export const queryTableApi = new QueryTableApi();

/*
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
              name: '空闲',
              data: [44, 55, 41, 67, 12, 5]
            }, 
            {
              name: '占用',
              data: [13, 23, 20, 8, 8, 0]
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
                type: 'text',
                categories: ["2人座","4人座","6人座","8人座","12人座","16人座"],
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
*/