export type CryptoTableStatus = '空闲' | '占用' ;

export interface CryptoTable {
  table_id: number;
  customer_number: number;
  table_capacity: number;
  occupied: string;
}

export interface CryptoSummary
{
  available_count:number;
  occupied_count:number;
  total_count:number;
  today_customer:number;
  total_customer:number;
}

export interface CryptoAllTable{
  summary:CryptoSummary;
  tables:CryptoTable[];
}