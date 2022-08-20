import {
  Promotion,
  PromotionStatus,
  SelectableDish,
  PromotionUpload
} from '@/models/promotion';
import { GetApi, PostApi, DeleteApi } from 'src/utils/requests';
import { getTitle, getDesc } from 'src/utils/array';

class PromotionsApi {
  // OK
  public getAllPromotion: () => Promise<Promotion[]> = async () => {

    const r = (await GetApi('/Promotions')).data;
    const promotions = r.map((promotion) => {
      return {
        id: promotion.promotion_id,
        name: getTitle(promotion.description),
        start: new Date(promotion.begin),
        end: new Date(promotion.end),
        description: getDesc(promotion.description),
        dishes: promotion.dishes.map((dish) => {
          return {
            name: dish.dish.dish_name,
            discount: dish.discount,
            price: dish.dish.dish_price
          };
        }),
        status:
          new Date() > new Date(promotion.end)
            ? 'completed'
            : new Date() < new Date(promotion.begin)
            ? 'ready'
            : 'running'
      };
    });
    promotions.sort((p1, _) => p1.status === 'running' ? -1 : 1);

    return Promise.resolve(promotions);
  };

  // OK
  public getPromotionById: (id: string) => Promise<Promotion> = async (id) => {

    const r = (await GetApi('/Promotions')).data;
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
      status: (new Date() > new Date(target.end)
        ? 'completed'
        : new Date() < new Date(target.begin)
        ? 'ready'
        : 'running') as PromotionStatus
    };
    console.error(p);

    // var p = promotions.find((promotion) => promotion.id === id);

    return Promise.resolve(p);
  };

  // OK
  public getSelectableDishes: () => Promise<SelectableDish[]> = async () => {
    // const dishes = [
    //     {
    //         name: '鱼香肉丝',
    //         price: 25,
    //         tags: ['川菜', '辣', '肉', '甜']
    //     },
    //     {
    //         name: '可乐鸡翅',
    //         price: 29,
    //         tags: ['甜', '肉', '鸡']
    //     },
    //     {
    //         name: '水煮肉片',
    //         price: 48,
    //         tags: ['川菜', '辣', '肉']
    //     },
    //     {
    //         name: '醋溜豆芽',
    //         price: 6,
    //         tags: ['酸', '辣', '素']
    //     },
    // ]
    try {
      const allDishes = (await GetApi('/Dishes')).data;
      // console.log(allDishes);
      const allPromotions = (await GetApi('/Promotions')).data;
      // console.log('all p',allPromotions);

      const runningPromotions = allPromotions.filter((p) => {
        return (
          new Date(p.begin).getTime() < new Date().getTime() &&
          new Date(p.end).getTime() > new Date().getTime()
        );
      });

      var runningPromotionDishes: string[] = [];
      runningPromotions.forEach((rp) => {
        rp.dishes.forEach((dish) => {
          if (!runningPromotionDishes.includes(dish.dish.dish_name))
            runningPromotionDishes.push(dish.dish.dish_name);
        });
      });
      // console.log('runningPromotions', runningPromotions);
      // console.log(runningPromotionDishes);

      const dishes = allDishes.filter(
        (e) => !runningPromotionDishes.includes(e.dis_name)
      );
      // console.log(dishes);
      return Promise.resolve(
        dishes.map((d) => {
          return {
            name: d.dis_name,
            price: d.price,
            tags: d.tags
          };
        })
      );
    } catch (err) {
      console.error(err);
      return Promise.resolve([]);
    }

    // return Promise.resolve(dishes);
  };

  public postNewPromotion: (promotion: PromotionUpload) => Promise<string> =
    async (promotion) => {
      const r = await PostApi('Promotions', promotion);
      return r.statusText;
    };

  public deletePromotionById: (promotion_id: string) => Promise<string> =
    async (promotion_id) => {
      return (
        await DeleteApi('Promotions/DelPromotionById', {
          id: promotion_id
        })
      ).statusText;
    };
}

export const promotionsApi = new PromotionsApi();
