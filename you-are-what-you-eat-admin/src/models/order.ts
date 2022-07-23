export type OrderStatus = "running" | "failed" | "completed"; 

export interface Order {
    id: string,
    creation_time: Date,
    table_id: string,
    status: OrderStatus,
    price: number
};
