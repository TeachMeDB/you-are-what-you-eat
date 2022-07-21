export interface PromotionDish {
    name:     string,
    discount: number
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
