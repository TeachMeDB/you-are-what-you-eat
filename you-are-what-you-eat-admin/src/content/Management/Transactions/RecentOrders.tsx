import { CryptoOrder } from '@/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import OrderSummary from '@/content/Dashboards/Crypto/OrderSummary';
import { Grid } from '@mui/material';

function RecentOrders() {
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
            <OrderSummary />
          </Grid>
          <Grid item xs={12}>
          <RecentOrdersTable cryptoOrders={cryptoOrders} />
          </Grid>
        </Grid> 
    </>
  );
}

export default RecentOrders;
