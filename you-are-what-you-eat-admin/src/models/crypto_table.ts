export type CryptoTableStatus = '空闲' | '占用' ;

import { CryptoOrderStatus } from "./crypto_order";

export interface CryptoTable {
  table_id: number;
  customer_number: number;
  table_capacity: number;
  occupied: string;
}

export interface CryptoOrderOnTable{
  order_id:string;
  creation_time:string;
  table_id:number;
  order_status:CryptoOrderStatus;
  total_price:number;
}

export interface CryptoSummary
{
  available_count:number;
  occupied_count:number;
  total_count:number;
  today_customer:number;
  total_customer:number;
}

export interface Serie
{
  name:string,
  data:number[]
}

export interface CryptoSummary2
{
  series: Serie[],
  options: 
  {
    chart?: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive?: 
    [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions?: 
    {
      bar: {
        horizontal: false,
        borderRadius: 10
      },
    },
    xaxis: 
    {
      type?: 'text',
      categories: string[],
    },
    legend?: 
    {
      position: 'right',
      offsetY: 40
    },
    fill?: 
    {
      opacity: 1
    }
  },    
}

export interface CryptoAllTable{
  summary:CryptoSummary;
  summary2:CryptoSummary2;
  tables:CryptoTable[];
}

export interface CryptoAutoAssignTable{
  has_table:boolean;
  table_id?:string;
  queue_id?:string;
}