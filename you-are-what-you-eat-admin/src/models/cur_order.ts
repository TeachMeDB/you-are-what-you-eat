interface dish {
    DishName: string,
    Dishstate: string
}

export interface CurOrder {
    OrderId: string,
    OrderStatus: string,
    Dish: dish[]
}