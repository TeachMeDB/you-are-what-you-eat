export interface MealInfo {

    description: string;
    dis_name: string;
    id: string;
    price: number;
    tags: string[];

    /**
    * 需要图片
    */
    picture: string;

    /**
     * 需要评分
     */
    rate: string;

    /**
     * 需要视频
     */
    video: string;
    /**
    * 需要原料
    */
    ingredient: string[];
}


export interface MealInfoUpload {
    description: string;
    dis_name: string;
    id: number;
    ingredient: string[];
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

    /**
    * 需要的原料
    */
    ingredient: string[];

}

