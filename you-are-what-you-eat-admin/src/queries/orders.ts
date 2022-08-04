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
import { GetApi } from 'src/utils/requests';
import { getDayTime, toTimeStamp } from 'src/utils/date';
// import { count } from 'src/utils/array';

class OrdersApi {
    
    // OK
    public getOrdersInTimePeriod: (start: number, end: number) => Promise<Order[]> = async (start, end) => {
        const r = (await GetApi("Orderlists/GetOrdersByTime", {
            begin: start,
            end  : end
        })).data.orders;
        const orders = r.map((item) => {
            return {
                id: item.order_id,
                creation_time: new Date(item.creation_time),
                table_id: item.table_id,
                status: (item.order_status === '已支付' ? 'failed' : item.order_status === '制作中' ? 'running' : 'completed'),
                price: item.final_payment,
                discount_price: item.discount_price
            }
        })

        return Promise.resolve(orders);
    }

    // OK
    public getDishSaleVolumeInTimePeriod: (start: number, end: number) => Promise<DishOrderStat[]> = async (start, end) => {
        const r = (await GetApi("Orderlists/GetDishOrderNum", {
            begin: start,
            end  : end
        })).data.data;
        const dishOrders = r.map((item) => {
            return {
                name:  item.name,
                id:    `id: ${item.dish_id}`,
                tags:  item.tags,
                price: item.price,
                order_times:  item.order_times,
                total_credit: item.total_credit,
                trend: []
            }
        })

        return Promise.resolve(dishOrders);
    }

    // OK
    public getDailyOrderStatics: () => Promise<DailyOrderStatic> = async () => {
        const todayStart = getDayTime(new Date(), 0, 'begin');
        const todayEnd = getDayTime(new Date(), 0, 'end');
        const yesterdatStart = getDayTime(new Date(), -1, 'begin');
        const yesterdayEnd = getDayTime(new Date(), -1, 'end');

        const todayOrders = (await GetApi("Orderlists/GetOrdersByTime", {
            begin: toTimeStamp(todayStart),
            end  : toTimeStamp(todayEnd)
        })).data.summary;
        const yesterdayOrders = (await GetApi("Orderlists/GetOrdersByTime", {
            begin: toTimeStamp(yesterdatStart),
            end  : toTimeStamp(yesterdayEnd)
        })).data.summary;
        const todayDishOrders = (await GetApi("Orderlists/GetDishordersByTime", {
            begin: toTimeStamp(todayStart),
            end  : toTimeStamp(todayEnd)
        })).data.data.length;
        const yesterdayDishOrders = (await GetApi("Orderlists/GetDishordersByTime", {
            begin: toTimeStamp(yesterdatStart),
            end  : toTimeStamp(yesterdayEnd)
        })).data.data.length;

        const stat: DailyOrderStatic = {
            order_num: todayOrders.order_count,
            order_num_change: yesterdayOrders.order_count,
            dish_order_num: todayDishOrders,
            dish_order_num_change: yesterdayDishOrders,
            turnover: todayOrders.total_credit,
            turnover_change: yesterdayOrders.total_credit
        };

        return Promise.resolve(stat);
    }

    // OK
    public getDailyOrderReport: () => Promise<OrderReport> = async () => {
        const todayStart = getDayTime(new Date(), 0, 'begin');
        const todayEnd = getDayTime(new Date(), 0, 'end');
        const todayOrders = (await GetApi("Orderlists/GetOrdersByTime", {
            begin: toTimeStamp(todayStart),
            end  : toTimeStamp(todayEnd)
        })).data.data;
        const breakfastOrders = todayOrders.filter(
            (order) => {
                var h = new Date(order.creation_time).getHours();
                return h < 10;
            }
        )
        var breakTnv: number = 0;
        breakfastOrders.forEach((b) => {
            breakTnv += b.final_payment;
        });
        const lunchOrders = todayOrders.filter(
            (order) => {
                var h = new Date(order.creation_time).getHours();
                return h >= 10 && h < 16;
            }
        )
        var lunchTnv: number = 0;
        lunchOrders.forEach((l) => {
            lunchTnv += l.final_payment;
        });
        const dinnerOrders = todayOrders.filter(
            (order) => {
                var h = new Date(order.creation_time).getHours();
                return h >= 16;
            }
        )
        var dinnerTnv: number = 0;
        dinnerOrders.forEach((d) => {
            dinnerTnv += d.final_payment;
        });
        
        
        const report: OrderReport = {
            breakfast_order_num: breakfastOrders.length,
            breakfast_turnover: breakTnv,
            lunch_order_num: lunchOrders.length,
            lunch_turnover: lunchTnv,
            dinner_order_num: dinnerOrders.length,
            dinner_turnover: dinnerTnv
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

    // OK
    public getActiveVIPs: (start: number, end: number) => Promise<ActiveVIP[]> = async (start, end) => {
        const r = (await GetApi("Orderlists/GetVipOrdersByTime", {
            begin: start,
            end  : end
        })).data.data;

        const data = r.map((item) => {
            return {
                username:     item.user_name,
                avatar:       item.avatar,
                order_num:    item.order_number,
                order_credit: item.total_credit
            };
        });

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