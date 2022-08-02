import {
    Promotion,
    PromotionStatus,
    SelectableDish
} from '@/models/promotion'

class PromotionsApi {
    public getAllPromotion: () => Promise<Promotion[]> = async () => {
        const promotions = [
            {
                id: "1",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [
                    {
                        name: '香辣鸡腿堡',
                        discount: 0.3,
                        price: 25
                    },
                    {
                        name: '香辣鸡翅',
                        discount: 0.2,
                        price: 9
                    },
                    {
                        name: '新奥尔良烤翅',
                        discount: 0.1,
                        price: 9
                    },
                ],
                status: "completed" as PromotionStatus
            },
            {
                id: "2",
                name: "疯狂星期三",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期三呃呃啊啊",
                dishes: [],
                status: "running" as PromotionStatus
            },
            {
                id: "3",
                name: "疯狂星期二",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嘻嘻哈哈",
                dishes: [
                    {
                        name: '香辣鸡腿堡',
                        discount: 0.3,
                        price: 9
                    },
                    {
                        name: '香辣鸡翅',
                        discount: 0.2,
                        price: 9
                    },
                    {
                        name: '新奥尔良烤翅',
                        discount: 0.1,
                        price: 9
                    },
                ],
                status: "ready" as PromotionStatus
            },
            {
                id: "4",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [
                    {
                        name: '香辣鸡腿堡',
                        discount: 0.3,
                        price: 9
                    },
                    {
                        name: '香辣鸡翅',
                        discount: 0.2,
                        price: 9
                    },
                    {
                        name: '新奥尔良烤翅',
                        discount: 0.1,
                        price: 9
                    },
                ],
                status: "completed" as PromotionStatus
            },
            {
                id: "5",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [
                    {
                        name: '香辣鸡腿堡',
                        discount: 0.3,
                        price: 9
                    },
                    {
                        name: '香辣鸡翅',
                        discount: 0.2,
                        price: 9
                    },
                    {
                        name: '新奥尔良烤翅',
                        discount: 0.1,
                        price: 9
                    },
                ],
                status: "completed" as PromotionStatus
            },
            {
                id: "6",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [],
                status: "completed" as PromotionStatus
            },
            {
                id: "7",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [],
                status: "completed" as PromotionStatus
            },
            {
                id: "8",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [],
                status: "completed" as PromotionStatus
            },
        ]

        return Promise.resolve(promotions);
    }

    public getPromotionById: (id: string) => Promise<Promotion> = async (id) => {
        const promotions = [
            {
                id: "1",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [
                    {
                        name: '香辣鸡腿堡',
                        discount: 0.3,
                        price: 25
                    },
                    {
                        name: '香辣鸡翅',
                        discount: 0.2,
                        price: 9
                    },
                    {
                        name: '新奥尔良烤翅',
                        discount: 0.1,
                        price: 9
                    },
                ],
                status: "completed" as PromotionStatus
            },
            {
                id: "2",
                name: "疯狂星期三",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期三呃呃啊啊",
                dishes: [],
                status: "running" as PromotionStatus
            },
            {
                id: "3",
                name: "疯狂星期二",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嘻嘻哈哈",
                dishes: [
                    {
                        name: '香辣鸡腿堡',
                        discount: 0.3,
                        price: 9
                    },
                    {
                        name: '香辣鸡翅',
                        discount: 0.2,
                        price: 9
                    },
                    {
                        name: '新奥尔良烤翅',
                        discount: 0.1,
                        price: 9
                    },
                ],
                status: "ready" as PromotionStatus
            },
            {
                id: "3",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [
                    {
                        name: '香辣鸡腿堡',
                        discount: 0.3,
                        price: 9
                    },
                    {
                        name: '香辣鸡翅',
                        discount: 0.2,
                        price: 9
                    },
                    {
                        name: '新奥尔良烤翅',
                        discount: 0.1,
                        price: 9
                    },
                ],
                status: "completed" as PromotionStatus
            },
            {
                id: "4",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [
                    {
                        name: '香辣鸡腿堡',
                        discount: 0.3,
                        price: 9
                    },
                    {
                        name: '香辣鸡翅',
                        discount: 0.2,
                        price: 9
                    },
                    {
                        name: '新奥尔良烤翅',
                        discount: 0.1,
                        price: 9
                    },
                ],
                status: "completed" as PromotionStatus
            },
            {
                id: "5",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [],
                status: "completed" as PromotionStatus
            },
            {
                id: "6",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [],
                status: "completed" as PromotionStatus
            },
            {
                id: "7",
                name: "疯狂星期四",
                start: new Date(),
                end: new Date(),
                description: "疯狂星期四嗯嗯啊啊",
                dishes: [],
                status: "completed" as PromotionStatus
            },
        ]

        var p = promotions.find((promotion) => promotion.id === id);

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