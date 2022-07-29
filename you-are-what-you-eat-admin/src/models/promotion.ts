export interface PromotionDish {
    name:     string,
    discount: number,
    price:    number,
}

export type PromotionStatus = "running" | "ready" | "completed"; 

export interface Promotion {
    id:          string,
    name:        string,
    start:       Date,
    end:         Date,
    description: string,
    dishes:      PromotionDish[],
    status:      PromotionStatus
};

export interface SelectableDish {
    name: string,
    price: number,
    tags: string[]
};

export interface SelectedDish {
    name: string,
    price: number,  // 原价
    discount: number
};