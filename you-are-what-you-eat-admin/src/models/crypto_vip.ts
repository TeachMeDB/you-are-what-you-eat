export type CryptoVipStatus = '正常' | '冻结' | '注销' ;

export interface CryptoVip {
  order_id : string;
  creation_time : string;
  table_id : string;
  status: CryptoVipStatus;
  total_price: number;
}
