export type CryptoOrderStatus = '已完成' | '待处理' | '已支付' | '制作中';

export interface CryptoOrder {
  order_id : string;
  creation_time : string;
  table_id : string;
  status: CryptoOrderStatus;
  total_price: number;
}
