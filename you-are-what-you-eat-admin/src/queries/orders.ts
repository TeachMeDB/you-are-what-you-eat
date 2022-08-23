import {
  Order,
  DailyOrderStatic,
  DishOrderStat,
  OrderReport,
  WeekBestSellerData,
  ActiveVIP,
  OrderDetail,
  OrderStatus
} from '@/models/order';
import { GetApi } from 'src/utils/requests';
import { getDayTime } from 'src/utils/date';
import { arrSum } from '@/utils/array';

class OrdersApi {
  // OK
  public getOrdersInTimePeriod: (
    start: string,
    end: string
  ) => Promise<Order[]> = async (start, end) => {
    const r = (
      await GetApi('Orderlists/GetOrdersByTime', {
        begin: start,
        end: end
      })
    ).data.orders;
    const orders = r.map((item) => {
      return {
        id: item.order_id,
        creation_time: new Date(item.creation_time),
        table_id: item.table_id,
        status:
          item.order_status === '已支付'
            ? 'failed'
            : item.order_status === '制作中'
            ? 'running'
            : 'completed',
        price: item.final_payment,
        discount_price: item.discount_price
      };
    });

    orders.sort((o1, o2) => o1.creation_time > o2.creation_time ? -1 : 1);

    return Promise.resolve(orders);
  };

  // OK
  public getDishSaleVolumeInTimePeriod: (
    start: string,
    end: string
  ) => Promise<DishOrderStat[]> = async (start, end) => {
    const r = (
      await GetApi('Orderlists/GetDishOrderNum', {
        begin: start,
        end: end
      })
    ).data.data;
    const dishOrders = r.map((item) => {
      return {
        name: item.name,
        id: `id: ${item.dish_id}`,
        tags: item.tags,
        price: item.price,
        order_times: item.order_times,
        total_credit: item.total_credit,
        trend: []
      };
    });

    return Promise.resolve(dishOrders);
  };

  // OK
  public getDailyOrderStatics: () => Promise<DailyOrderStatic> = async () => {
    const todayStart = getDayTime(new Date(), 0, 'begin');
    const todayEnd = getDayTime(new Date(), 0, 'end');
    const yesterdatStart = getDayTime(new Date(), -1, 'begin');
    const yesterdayEnd = getDayTime(new Date(), -1, 'end');

    console.log(111);
    const todayOrders = (
      await GetApi('Orderlists/GetOrdersByTime', {
        begin: getDayTime(new Date(), 0, 'begin'),
        end: getDayTime(new Date(), 0, 'end')
      })
    ).data.summary;
    console.log(222);
    const yesterdayOrders = (
      await GetApi('Orderlists/GetOrdersByTime', {
        begin: yesterdatStart,
        end: yesterdayEnd
      })
    ).data.summary;
    const todayDishOrders = (
      await GetApi('Orderlists/GetDishordersByTime', {
        begin: todayStart,
        end: todayEnd
      })
    ).data.data.length;
    const yesterdayDishOrders = (
      await GetApi('Orderlists/GetDishordersByTime', {
        begin: yesterdatStart,
        end: yesterdayEnd
      })
    ).data.data.length;

    const stat: DailyOrderStatic = {
      order_num: todayOrders.order_count,
      order_num_change: yesterdayOrders.order_count,
      dish_order_num: todayDishOrders,
      dish_order_num_change: yesterdayDishOrders,
      turnover: todayOrders.total_credit,
      turnover_change: yesterdayOrders.total_credit
    };

    return Promise.resolve(stat);
  };

  // OK
  public getDailyOrderReport: () => Promise<OrderReport> = async () => {
    const todayStart = getDayTime(new Date(), 0, 'begin');
    const todayEnd = getDayTime(new Date(), 0, 'end');
    const todayOrders = (
      await GetApi('Orderlists/GetOrdersByTime', {
        begin: todayStart,
        end: todayEnd
      })
    ).data.orders;
    console.log('ttt',todayOrders);
    const breakfastOrders = todayOrders.filter((order) => {
      var h = new Date(order.creation_time).getHours();
      return h < 10;
    });
    var breakTnv: number = 0;
    breakfastOrders.forEach((b) => {
      breakTnv += b.final_payment;
    });
    const lunchOrders = todayOrders.filter((order) => {
      var h = new Date(order.creation_time).getHours();
      return h >= 10 && h < 16;
    });
    var lunchTnv: number = 0;
    lunchOrders.forEach((l) => {
      lunchTnv += l.final_payment;
    });
    const dinnerOrders = todayOrders.filter((order) => {
      var h = new Date(order.creation_time).getHours();
      return h >= 16;
    });
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
  };

  public getWeekBestSellerData: () => Promise<WeekBestSellerData> =
    async () => {
      const rawTopList = (
        await GetApi('Orderlists/GetDishOrderNum', {
          begin: getDayTime(new Date(), -7, 'begin'),
          end: getDayTime(new Date(), 0, 'end')
        })
      ).data.data;
      console.log(rawTopList);
      var top_list = rawTopList.map((d) => {
        return {
          name: d.name,
          order_num: d.order_times,
          total_credit: d.total_credit,
          increase: 1
        };
      });
      var best = {
        best_seller: '',
        total: 0,
        increase: 0,
        breakfast: [0, 0, 0, 0, 0, 0, 0],
        lunch: [0, 0, 0, 0, 0, 0, 0],
        dinner: [0, 0, 0, 0, 0, 0, 0]
      };
      if (top_list.length > 0) {
        best.best_seller = top_list[0].name;
        best.total = top_list[0].total_credit;
        best.lunch = await Promise.all(
          [-6, -5, -4, -3, -2, -1, 0].map(async (offset) => {
            const r = (
              await GetApi('Orderlists/GetDishOrderNum', {
                begin: getDayTime(new Date(), offset, 'begin'),
                end: getDayTime(new Date(), offset, 'end')
              })
            ).data.data;
            const fr = r.filter((d) => d.name === top_list[0].name);
            if (fr.length <= 0) return 0;
            else return fr[0].order_times;
          })
        );
      }
      console.log(best);

      const data = {
        ...best,
        top_list: top_list
      };

      return Promise.resolve(data);
    };

  // OK
  public getActiveVIPs: (start: string, end: string) => Promise<ActiveVIP[]> =
    async (start, end) => {
      const r = (
        await GetApi('Orderlists/GetVipOrdersByTime', {
          begin: start,
          end: end
        })
      ).data.data;

      const data = r.map((item) => {
        return {
          username: item.user_name,
          avatar: item.avatar,
          order_num: item.order_number,
          order_credit: item.total_credit
        };
      });

      return Promise.resolve(data);
    };

  // OK
  public getOrderDetail: (order_id: string) => Promise<OrderDetail> = async (
    order_id
  ) => {
    const order = (
      await GetApi('Order/GetOrderById', {
        order_id: order_id
      })
    ).data;

    const dishList = (
      await GetApi('Order/GetOrderDish', {
        order_id: order_id
      })
    ).data.data;

    const orderOriPrice = arrSum(dishList, (d) => d.original_price);
    console.log(orderOriPrice);

    const dishes = await Promise.all(
      dishList.map(async (d) => {
        return {
          dish_name: (
            await GetApi('Dishes/GetDishNameById', {
              dish_id: d.dish_id
            })
          ).data,
          ori_price: d.original_price,
          final_payment: d.final_payment,
          dish_status: d.dish_status
        };
      })
    );

    const data = {
      order_id: order.order_id,
      table_id: order.table_id,
      creation_time: order.creation_time,
      ori_price: orderOriPrice,
      final_payment: order.total_price,
      order_status: (order.order_status === '已完成'
        ? 'completed'
        : order.order_status === '制作中'
        ? 'running'
        : 'failed') as OrderStatus,
      dishes: dishes
    };

    if (!order) {
      return null;
    }
    return Promise.resolve(data);
  };
}

export const ordersApi = new OrdersApi();
