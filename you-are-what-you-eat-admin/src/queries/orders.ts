import { 
    Order, 
    DailyOrderStatic, 
    DishOrderStat,
    OrderReport,
    WeekBestSellerData,
    ActiveVIP,
    OrderDetail,
    OrderStatus
} from "@/models/order";

class OrdersApi {
    public getOrdersInTimePeriod: (start: Date, end: Date) => Promise<Order[]> = async (start, end) => {
        const orders: Order[] = [
            {
                id: 'ADF7284',
                creation_time: new Date('2022-7-23 09:08:32'),
                table_id: 'A42',
                status: 'running',
                price: 236.7,
                discount_price: 0
            },
            {
                id: 'ASK3049',
                creation_time: new Date('2022-7-23 09:14:32'),
                table_id: 'A07',
                status: 'failed',
                price: 112.8,
                discount_price: 12
            },
            {
                id: 'BOL7894',
                creation_time: new Date('2022-7-23 10:06:55'),
                table_id: 'B28',
                status: 'completed',
                price: 46,
                discount_price: 5
            },
            {
                id: 'ERX5512',
                creation_time: new Date('2022-7-23 10:45:03'),
                table_id: 'E06',
                status: 'running',
                price: 60,
                discount_price: 10
            },
            {
                id: 'DDW0094',
                creation_time: new Date('2022-7-23 10:53:10'),
                table_id: 'D12',
                status: 'running',
                price: 80,
                discount_price: 0
            },
            {
                id: 'CAE0578',
                creation_time: new Date('2022-7-23 11:08:21'),
                table_id: 'C24',
                status: 'running',
                price: 205,
                discount_price: 0
            },
            {
                id: 'CAE0581',
                creation_time: new Date('2022-7-23 11:11:11'),
                table_id: 'C92',
                status: 'failed',
                price: 23,
                discount_price: 0
            },
            {
                id: 'BPH1245',
                creation_time: new Date('2022-7-23 11:35:45'),
                table_id: 'B14',
                status: 'running',
                price: 236.7,
                discount_price: 0
            },
        ];

        return Promise.resolve(orders);
    }

    public getDishSaleVolumeInTimePeriod: (start: Date, end: Date) => Promise<DishOrderStat[]> = async (start, end) => {
        const dishOrders: DishOrderStat[] = [
            {
                name: '香辣鸡翅',
                id: 'dsaczx',
                tags: ['洋快餐', '辣'],
                price: 25,
                order_times: 100,
                total_credit: 2500,
                trend: [45, 56, 24, 38]
            },
            {
                name: '鱼香肉丝',
                id: 'xczasd',
                tags: ['中餐', '川菜','辣', '甜'],
                price: 25,
                order_times: 100,
                total_credit: 2500,
                trend: [45, 56, 24, 56, 54, 38, 47]
            },
            {
                name: '草莓圣代',
                id: 'gfdnb',
                tags: ['甜点', '冷饮','冰淇淋'],
                price: 25,
                order_times: 100,
                total_credit: 2500,
                trend: [45, 56, 24, 56, 54, 38, 47, 38, 56, 24, 38, 55, 39]
            },
          ];

        return Promise.resolve(dishOrders);
    }

    public getDailyOrderStatics: (start: Date, end: Date) => Promise<DailyOrderStatic> = async (start, end) => {
        const stat: DailyOrderStatic = {
            order_num: 500,
            order_num_change: -0.03,
            dish_order_num: 788,
            dish_order_num_change: 0.09,
            turnover: 15680,
            turnover_change: 0.02
        };

        return Promise.resolve(stat);
    }

    public getDailyOrderReport: () => Promise<OrderReport> = async () => {
        const report: OrderReport = {
            breakfast_order_num: 33,
            breakfast_turnover: 659,
            lunch_order_num: 121,
            lunch_turnover: 4008,
            dinner_order_num: 166,
            dinner_turnover: 6790
        };

        return Promise.resolve(report);
    }

    public getWeekBestSellerData: () => Promise<WeekBestSellerData> = async () => {
        const data = {
            best_seller: '青椒炒肉',
            total: 10948,
            increase: 0.26,
            breakfast: [0, 11, 5, 23, 2, 18, 7],
            lunch: [122, 98, 304, 55, 223, 560, 733],
            dinner: [169, 188, 234, 92, 15, 135, 36],
            top_list: [
                {
                    name: '可乐',
                    order_num: 569,
                    total_cred: 2845,
                    increase: 0.4
                },
                {
                    name: '可乐鸡翅',
                    order_num: 495,
                    total_cred: 23760,
                    increase: 0.4
                },
                {
                    name: '葱爆羊肉',
                    order_num: 408,
                    total_cred: 27744,
                    increase: -0.2
                }
            ]
        }

        return Promise.resolve(data);
    }

    public getActiveVIPs: () => Promise<ActiveVIP[]> = async () => {
        const data = [
            {
                username: 'li-letian',
                avatar: '/static/images/avatars/1.jpg',
                order_num: 69,
                order_credit: 3452
            },
            {
                username: 'KEN',
                avatar: '/static/images/avatars/2.jpg',
                order_num: 54,
                order_credit: 3672
            },
            {
                username: 'renjiedai',
                avatar: '/static/images/avatars/3.jpg',
                order_num: 50,
                order_credit: 2500
            },
            {
                username: 'vegetable-yx',
                avatar: '/static/images/avatars/4.jpg',
                order_num: 44,
                order_credit: 1628
            }
        ]

        return Promise.resolve(data);
    }

    public getOrderDetail: (order_id: string) => Promise<OrderDetail> = async () => {
        const data = {
            order_id: 'ADF7284',
            table_id: 'A32',
            creation_time: '2022-7-20 20:00:00',
            ori_price: 100,
            final_payment: 95,
            order_status: 'running' as OrderStatus,
            dishes: [
                {
                    dish_name: '鱼香肉丝',
                    ori_price: 25,
                    final_payment: 20,
                    dish_status: '已完成'
                },
                {
                    dish_name: '清炒包菜',
                    ori_price: 12,
                    final_payment: 12,
                    dish_status: '已完成'
                }
            ]
        }

        return Promise.resolve(data);
    }
}

export const ordersApi = new OrdersApi();