export type CryptoOrderStatus = '已完成' | '待处理' | '已支付' | '制作中';

export interface CryptoOrder {
  order_id : string;
  creation_time : string;
  table_id : string;
  order_status: CryptoOrderStatus;
  total_price: number;
}


export interface CryptoOrderEdit {
  order_id : string;
  creation_time : string;
  table_id : string;
  order_status: CryptoOrderStatus;
}


export interface CryptoSummary
{
  order_count: number;
  awaiting_count: number;
  awaiting_credit: number;
  processing_count: number;
  processing_credit: number;
  completed_count: number;
  completed_credit: number;
  payed_count: number;
  payed_credit: number;
  total_credit: number;
  today_credit: number;
}

export interface CryptoFullOrder{
  summary:CryptoSummary;
  orders:CryptoOrder[];
}
