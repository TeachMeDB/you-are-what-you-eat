import { CryptoTable,CryptoSummary,CryptoAllTable } from '@/models/crypto_table';
import TableListTable from './TableListTable';

import { useState, useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
import { queryTableApi } from '@/queries/query_table';

import TableSummary from './TableSummary';
import TableSummary2 from './TableSummary2';
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
import TableSummarySkeleton from './TableSummarySkeleton';
import TableListTableSkeleton from './TableListTableSkeleton';

function TablePage() {
  
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  }

  const isMountedRef = useRefMounted();
  const [tableData, setTableData] = useState<CryptoAllTable>(null);

  const getVipData = useCallback(async () => {
    try {
      const response = await queryTableApi.getTable();

      //console.log("--response--");
      //console.log(response);

      if (isMountedRef()) {
        setTableData(response);
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
  if (!tableData)
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
            <TableSummarySkeleton/>
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="text" />                     
          </Grid>

          <Grid item xs={12}>
            <TableListTableSkeleton/>
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
            <TableSummary cryptoSummary={tableData.summary}/>
          </Grid>
          <Grid item xs={12}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography><b>按餐桌人数查看</b></Typography>
           </AccordionSummary>
           <AccordionDetails>
           <TableSummary2 cryptoSummary2={tableData.summary2}/>
           </AccordionDetails>
           </Accordion>            
          </Grid>

          <Grid item xs={12}>
            <TableListTable cryptoTable={tableData.tables} />
          </Grid>
        </Grid> 
    </>
  );
}

export default TablePage;

/*
const CryptoTable: CryptoTable[] = [
    {
      table_id: 1,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 2,
      customer_number: 1,
      table_capacity: 2,
      occupied: '占用'
    },
    {
      table_id: 3,
      customer_number: 2,
      table_capacity: 2,
      occupied: '占用'
    },
    {
      table_id: 4,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 5,
      customer_number: 2,
      table_capacity: 2,
      occupied: '占用'
    },
    {
      table_id: 6,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 7,
      customer_number: 1,
      table_capacity: 2,
      occupied: '占用'
    },
    {
      table_id: 8,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 9,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 10,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 11,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 12,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 13,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 14,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 15,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: 16,
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    }
  ];
*/
