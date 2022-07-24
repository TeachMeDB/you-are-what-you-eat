import { CryptoTable } from '@/models/crypto_table';
import TableListTable from './TableListTable';
import { Grid } from '@mui/material';

function TablePage() {
  const CryptoTable: CryptoTable[] = [
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
    },
    {
      table_id: '1',
      customer_number: 0,
      table_capacity: 2,
      occupied: '空闲'
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
            <TableListTable cryptoTable={CryptoTable} />
          </Grid>
        </Grid> 
    </>
  );
}

export default TablePage;
