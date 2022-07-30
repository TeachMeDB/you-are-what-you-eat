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
              gender : 1,
              status: '正常',
              balance: 145.14,
              credit: 145.14
            },
            {
              user_name : '淳平',
              birthday : '1919-08-10',
              gender : 1,
              status: '冻结',
              balance: 145.14,
              credit: 1919.81
            },
            {
              user_name : '鲁铎象征',
              birthday : '1981-03-13',
              gender : 0,
              status: '正常',
              balance: 3333.33,
              credit: 1920.00
            },
            {
              user_name : '小栗帽',
              birthday : '1985-03-27',
              gender : 0,
              status: '注销',
              balance: 0.00,
              credit: 25367.23
            },
            {
              user_name : '玉藻十字',
              birthday : '1984-05-23',
              gender : 0,
              status: '冻结',
              balance: 145.14,
              credit: 127.5
            }
          ]
        };

        return Promise.resolve(data); 
    }

}

export const queryVipApi = new QueryVipApi();