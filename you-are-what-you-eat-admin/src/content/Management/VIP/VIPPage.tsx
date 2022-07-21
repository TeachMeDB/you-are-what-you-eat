import { CryptoVip } from '@/models/crypto_vip';
import VIPListTable from './VIPListTable';
import { Grid } from '@mui/material';

function VIPPage() {
  const CryptoVip: CryptoVip[] = [
    {
      user_name : '田所浩二',
      birthday : '2022-04-27 00:00:00',
      gender : 1,
      status: '正常',
      credit: 145.14
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
