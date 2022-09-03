export interface StockInfo {

  amount: number;
  date: string;
  ing_name: string;
  record_id: string;
  surplus: number;
}

export interface SurplusUpload {
  record_id: string;
  surplus: number;
}


export interface StockInfoData {
  ing_name: string;
  amount: number;

}


