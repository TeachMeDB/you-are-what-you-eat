export interface MealInfo {
    description: string;
    dis_name: string;
    id: string;
    price: number;
    tags: string[];
}


export interface MealInfoUpload {
    description: string;
    dis_name: string;
    id: number;
    price: number;
    tags: string[];

}

export interface MealInfoAdd {
    description: string;
    dis_name: string;
    id: number;
    picture: string;
    price: number;
    tags: string[];
    video: string;
}