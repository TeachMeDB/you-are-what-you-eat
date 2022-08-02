import {
    Promotion,
    PromotionStatus,
    SelectableDish
} from '@/models/promotion';
import { GetApi } from 'src/utils/requests';

class PromotionsApi {
    // Almost OK
    public getAllPromotion: () => Promise<Promotion[]> = async () => {
        // const promotions = [
        //     {
        //         id: "4",
        //         name: "疯狂星期四",
        //         start: new Date(),
        //         end: new Date(),
        //         description: "疯狂星期四嗯嗯啊啊",
        //         dishes: [
        //             {
        //                 name: '香辣鸡腿堡',
        //                 discount: 0.3,
        //                 price: 9
        //             },
        //             {
        //                 name: '香辣鸡翅',
        //                 discount: 0.2,
        //                 price: 9
        //             },
        //             {
        //                 name: '新奥尔良烤翅',
        //                 discount: 0.1,
        //                 price: 9
        //             },
        //         ],
        //         status: "completed" as PromotionStatus
        //     }
        // ]

        const r = (await GetApi("/Promotions")).data;
        const promotions = r.map((promotion) => {
            return {
                id: promotion.promotion_id,
                name: promotion.description,
                start: new Date(promotion.begin),
                end:   new Date(promotion.end),
                description: promotion.description,
                dishes: (promotion.dishes.map((dish) => {
                    return {
                        name: dish.dish.dish_name,
                        discount: dish.discount,
                        price: dish.dish.dish_price
                    };
                })),
                status: (new Date() > new Date(promotion.end) ? 'completed' : new Date() < new Date(promotion.begin) ? 'ready' : 'running')
            };
        });


        return Promise.resolve(promotions);
    }

    public getPromotionById: (id: string) => Promise<Promotion> = async (id) => {
        // const promotions = [
        //     {
        //         id: "1",
        //         name: "疯狂星期四",
        //         start: new Date(),
        //         end: new Date(),
        //         description: "疯狂星期四嗯嗯啊啊",
        //         dishes: [
        //             {
        //                 name: '香辣鸡腿堡',
        //                 discount: 0.3,
        //                 price: 25
        //             },
        //             {
        //                 name: '香辣鸡翅',
        //                 discount: 0.2,
        //                 price: 9
        //             },
        //             {
        //                 name: '新奥尔良烤翅',
        //                 discount: 0.1,
        //                 price: 9
        //             },
        //         ],
        //         status: "completed" as PromotionStatus
        //     },
        // ]

        const r = (await GetApi("/Promotions")).data;
        console.log(r);
        const targetList = r.filter((p) => p.promotion_id === Number(id));
        if (targetList.length <= 0) return null;
        
        const target = targetList[0];
        const p = {
            id: `${target.promotion_id}`,
            name: target.description,
            start: new Date(target.begin),
            end: new Date(target.end),
            description: target.description,
            dishes: target.dishes.map((dish) => {
                return {
                    name: dish.dish.dish_name,
                    discount: dish.discount,
                    price: dish.dish.dish_price
                };
            }),
            status: (new Date() > new Date(target.end) ? 'completed' : new Date() < new Date(target.begin) ? 'ready' : 'running') as PromotionStatus
        };
        console.error(p);

        // var p = promotions.find((promotion) => promotion.id === id);

        return Promise.resolve(p);
    }

    public getSelectableDishes: () => Promise<SelectableDish[]> = async () => {
        const dishes = [
            {
                name: '鱼香肉丝',
                price: 25,
                tags: ['川菜', '辣', '肉', '甜']
            },
            {
                name: '可乐鸡翅',
                price: 29,
                tags: ['甜', '肉', '鸡']
            },
            {
                name: '水煮肉片',
                price: 48,
                tags: ['川菜', '辣', '肉']
            },
            {
                name: '醋溜豆芽',
                price: 6,
                tags: ['酸', '辣', '素']
            },
        ]

        return Promise.resolve(dishes);
    }
}

export const promotionsApi = new PromotionsApi();