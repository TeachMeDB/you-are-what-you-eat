import { CryptoVip } from '@/models/crypto_vip';
import VIPListTable from './VIPListTable';
import { Grid } from '@mui/material';

import { useState, useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
import { queryVipApi } from '@/queries/query_vip';

function VIPPage() {
  const isMountedRef = useRefMounted();
  const [vipData, setVipData] = useState<CryptoVip[]>(null);

  const getVipData = useCallback(async () => {
    try {
      const response = await queryVipApi.getVip();

      //console.log("--response--");
      //console.log(response);

      if (isMountedRef()) {
        setVipData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getVipData();
  }, [getVipData]);

  //console.log("--orderData--");
  //console.log(orderData);
  if (!vipData)
    return null;


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
            <VIPListTable cryptoVip={vipData} />
          </Grid>
        </Grid> 
    </>
  );
}

export default VIPPage;


/*
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
*/