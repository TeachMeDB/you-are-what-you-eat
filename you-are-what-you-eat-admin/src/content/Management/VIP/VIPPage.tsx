import { CryptoOrder } from '@/models/crypto_order';
import VIPListTable from './VIPListTable';
import { Grid } from '@mui/material';

function VIPPage() {
  const cryptoOrders: CryptoOrder[] = [
    {
      order_id : 'sidfh3f7sdh',
      creation_time : '2022-04-27 00:00:00',
      table_id : 'A32',
      status: '已支付',
      total_price: 145.14
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
            <VIPListTable cryptoOrders={cryptoOrders} />
          </Grid>
        </Grid> 
    </>
  );
}

export default VIPPage;
