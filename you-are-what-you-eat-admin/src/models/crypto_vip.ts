export type CryptoVipStatus = '正常' | '冻结' | '注销' ;

export interface CryptoVip {
  user_name : string;
  birthday : string;
  gender : number;
  status: CryptoVipStatus;
  balance: number;
  credit: number;
}
