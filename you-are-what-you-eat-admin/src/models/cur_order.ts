interface dish {
    DishName: string,
    Dishstate: string
}

export interface Order {
    OrderId: string,
    OrderStatus: string,
    Dish: dish[]
}