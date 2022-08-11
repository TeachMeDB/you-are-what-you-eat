import CurOrderTable from './CurOrderTable';

const curOrders = [
  {
    OrderId: '001',
    OrderStatus: '未完成',
    Dish: [
      {
        DishName: '水煮包菜',
        Dishstate: '未完成'
      },
      {
        DishName: '水煮西葫芦',
        Dishstate: '未完成'
      }
    ]
  },
  {
    OrderId: '002',
    OrderStatus: '未完成',
    Dish: [
      {
        DishName: '清蒸白菜',
        Dishstate: '未完成'
      },
      {
        DishName: '猪肉刺身',
        Dishstate: '未完成'
      }
    ]
  },
  {
    OrderId: '003',
    OrderStatus: '未完成',
    Dish: [
      {
        DishName: '清蒸白菜',
        Dishstate: '未完成'
      },
      {
        DishName: '猪肉刺身',
        Dishstate: '未完成'
      }
    ]
  },
  {
    OrderId: '003',
    OrderStatus: '未完成',
    Dish: [
      {
        DishName: '清蒸白菜',
        Dishstate: '未完成'
      },
      {
        DishName: '猪肉刺身',
        Dishstate: '未完成'
      }
    ]
  },
  {
    OrderId: '003',
    OrderStatus: '未完成',
    Dish: [
      {
        DishName: '清蒸白菜',
        Dishstate: '未完成'
      },
      {
        DishName: '猪肉刺身',
        Dishstate: '未完成'
      }
    ]
  }
];

export default function CurOrder() {
  return (
    <div>
      <CurOrderTable CurOrders={curOrders} />
    </div>
  );
}
