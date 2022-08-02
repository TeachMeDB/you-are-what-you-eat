import { CryptoAllVip } from "@/models/crypto_vip";

class QueryVipApi {
    public getVip: () => Promise<CryptoAllVip> = async () => {
        const data:CryptoAllVip = 
        {
          summary:
          {          
            series: [
              {
              name: '积分',
              data: [44, 55, 41, 67, 12]
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
                categories: ["田所浩二","淳平","鲁铎象征","小栗帽","玉藻十字"],
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
          summary2:
          {          
            series: [
              {
              name: '余额',
              data: [44, 55, 41, 67, 12]
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
                categories: ["田所浩二","淳平","鲁铎象征","小栗帽","玉藻十字"],
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
          vips:
          [
            {
              user_name : '田所浩二',
              birthday : '1922-04-27',
              gender : "男",
              status: '正常',
              balance: 145.14,
              credit: 145.14
            },
            {
              user_name : '淳平',
              birthday : '1919-08-10',
              gender : "男",
              status: '冻结',
              balance: 145.14,
              credit: 1919.81
            },
            {
              user_name : '鲁铎象征',
              birthday : '1981-03-13',
              gender : "女",
              status: '正常',
              balance: 3333.33,
              credit: 1920.00
            },
            {
              user_name : '小栗帽',
              birthday : '1985-03-27',
              gender : "女",
              status: '注销',
              balance: 0.00,
              credit: 25367.23
            },
            {
              user_name : '玉藻十字',
              birthday : '1984-05-23',
              gender : "女",
              status: '冻结',
              balance: 145.14,
              credit: 127.5
            }
          ]
        };

        /*
        try {
          const r = await (await fetch('http://106.14.212.200:8000/app/api/VIP/GetAllVIPInfo')).text();
          console.log(JSON.parse(r));
          console.log(data);
          return JSON.parse(r) as CryptoAllVip;
      } 
      catch(err) {
          console.log(err);
          return null;
      }*/

        return Promise.resolve(data); 
    }

}

export const queryVipApi = new QueryVipApi();