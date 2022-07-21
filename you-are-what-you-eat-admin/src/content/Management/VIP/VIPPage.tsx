import { CryptoVip } from '@/models/crypto_vip';
import VIPListTable from './VIPListTable';
import { Grid } from '@mui/material';

function VIPPage() {
  const CryptoVip: CryptoVip[] = [
    {
      user_name : '田所浩二',
      birthday : '1922-04-27',
      gender : 1,
      status: '正常',
      balance: 145.14,
      credit: 145.14
    },
    {
      user_name : '淳平',
      birthday : '1919-08-10',
      gender : 1,
      status: '冻结',
      balance: 145.14,
      credit: 1919.81
    },
    {
      user_name : '鲁铎象征',
      birthday : '1981-03-13',
      gender : 0,
      status: '正常',
      balance: 3333.33,
      credit: 1920.00
    },
    {
      user_name : '小栗帽',
      birthday : '1985-03-27',
      gender : 0,
      status: '注销',
      balance: 0.00,
      credit: 25367.23
    },
    {
      user_name : '玉藻十字',
      birthday : '1984-05-23',
      gender : 0,
      status: '冻结',
      balance: 145.14,
      credit: 127.5
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
            <VIPListTable cryptoVip={CryptoVip} />
          </Grid>
        </Grid> 
    </>
  );
}

export default VIPPage;
