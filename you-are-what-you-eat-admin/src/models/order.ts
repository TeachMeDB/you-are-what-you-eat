export type OrderStatus = "running" | "failed" | "completed"; 

export interface Order {
    id: string,
    creation_time: Date,
    table_id: string,
    status: OrderStatus,
    price: number
    discount_price: number
};

export interface DishOrderStat {
    name: string,
    id: string,
    tags: string[],
    price: number,
    order_times: number,
    total_credit: number,
    trend: number[]
};


export interface DailyOrderStatic {
    order_num: number,
    order_num_change: number,
    dish_order_num: number,
    dish_order_num_change: number,
    turnover: number,
    turnover_change: number
};

export interface WeekBestSellerData {
    best_seller: string,
    total: number,
    increase: number,
    breakfast: number[],
    lunch: number[],
    dinner: number[],
    top_list: {
        name: string,
        order_num: number,
        total_cred: number,
        increase: number
    }[]
};

export interface OrderReport {
    breakfast_order_num: number,
    breakfast_turnover: number,
    lunch_order_num: number,
    lunch_turnover: number,
    dinner_order_num: number,
    dinner_turnover: number
};

export interface ActiveVIP {
    username: string,
    avatar: string,
    order_num: number,
    order_credit: number
};

export interface OrderDetail {
    order_id: string,
    table_id: string,
    creation_time: string,
    ori_price: number,
    final_payment: number,
    order_status: OrderStatus,
    dishes: {
        dish_name: string,
        ori_price: number,
        final_payment: number,
        dish_status: string
    }[]
}