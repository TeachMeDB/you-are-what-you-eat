import { CryptoAllVip } from '@/models/crypto_vip';
import VIPListTable from './VIPListTable';

import { useState, useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
import { queryVipApi } from '@/queries/query_vip';
import VipSummary from './VipSummary';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Skeleton from '@mui/material/Skeleton';
import VIPListTableSkeleton from './VIPListTableSkeleton';

function VIPPage() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [expanded2, setExpanded2] = useState<string | false>(false);
  const handleChange2 =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded2(isExpanded ? panel : false);
    };

  const isMountedRef = useRefMounted();
  const [vipData, setVipData] = useState<CryptoAllVip>(null);

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
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
          </Grid>
          <Grid item xs={12}>
            <VIPListTableSkeleton />
          </Grid>
        </Grid>
      </>
    );

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
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <b>查看积分统计</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <VipSummary cryptoSummary={vipData.summary} />
            </AccordionDetails>
          </Accordion>

          {/*<Divider />

          <Accordion
            expanded={expanded2 === 'panel1'}
            onChange={handleChange2('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <b>查看余额统计</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <VipSummary cryptoSummary={vipData.summary2} />
            </AccordionDetails>
          </Accordion>*/}
          </Grid>

        <Grid item xs={12}>
          <VIPListTable cryptoVip={vipData.vips} />
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
