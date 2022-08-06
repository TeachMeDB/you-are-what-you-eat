export interface CurOrder {
    dish: Dish[];
    order_id: string;
    order_status: string;
}

export interface Dish {
    dish_name: string;
    dish_order_id: string;
    status: string;
}
export interface DishStatusUpload {
    dish_id: number;
    dish_status: string;
    order_id: string;
}

export interface OrderStatusUpload {
    order_id: string;
    order_status: string;
}