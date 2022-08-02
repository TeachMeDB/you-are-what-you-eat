import { CryptoTable } from '@/models/crypto_table';
import TableListTable from './TableListTable';
import { Grid } from '@mui/material';

function TablePage() {
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
