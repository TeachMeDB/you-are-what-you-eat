import { CryptoOrder } from '@/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import OrderSummary from '@/content/Dashboards/Crypto/OrderSummary';
import { Grid } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
import {queryOrderApi} from 'src/queries/query_order'

function RecentOrders() {
  const isMountedRef = useRefMounted();
  const [orderData, setOrderData] = useState<CryptoOrder[]>([]);

  const getOrderData = useCallback(async () => {
    try {
      const response = await queryOrderApi.getOrder();

      if (isMountedRef()) {
        setOrderData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOrderData();
  }, [getOrderData]);

  /*
  const cryptoOrders: CryptoOrder[] = [
    {
      order_id : 'sidfh3f7sdh',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'A32',
      status: '已支付',
      total_price: 145.14
    },
    {
      order_id : 'hsudfg82dsf',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'B10',
      status: '已完成',
      total_price: 98.10
    },
    {
      order_id : '87fehrug2ug',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'C96',
      status: '已支付',
      total_price: 39.99
    },
    {
      order_id : '7neygfwurtw',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'A02',
      status: '待处理',
      total_price: 105.00
    },
    {
      order_id : '7nysdg8sn3a',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'D27',
      status: '制作中',
      total_price: 90.50
    },
    {
      order_id : '283nx8ewyfs',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'A32',
      status: '已支付',
      total_price: 9
    },
    {
      order_id : '4783cnyergx',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'A32',
      status: '制作中',
      total_price: 9
    },
    {
      order_id : '4nefugng68l',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'A32',
      status: '已支付',
      total_price: 9
    },
    {
      order_id : '9snfsd9dfsf',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'A32',
      status: '已完成',
      total_price: 9
    },
    {
      order_id : '12hejhfbdys',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'A32',
      status: '已支付',
      total_price: 9
    }
  ];
  */

  return (  
    <>   
    <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <OrderSummary 
            
              order_count= {100}
              awating_count= {10}
              awating_credit= {100}
              processing_count= {25}
              processing_credit= {100}
              completed_count= {30}
              completed_credit= {100}
              payed_count= {35}
              payed_credit= {100}
              total_credit= {100}
              today_credit= {100}
            
            />
          </Grid>
          <Grid item xs={12}>
            <RecentOrdersTable cryptoOrders={orderData} />
          </Grid>
        </Grid> 
    </>
  );
}

export default RecentOrders;
