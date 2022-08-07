import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Grid,
  Stack,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '@/components/Label';
import { CryptoTable,CryptoTableStatus } from '@/models/crypto_table';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BulkActions from './BulkActions';
import TextField from '@mui/material/TextField';

import ModifyDialog from './ModifyDialog'
import SignUpVip from './AssignSeat'
import IndividualTable from './IndividualTable'

interface VIPListTableProps {
  className?: string;
  cryptoTable: CryptoTable[];
}

interface Filters {
  status?: CryptoTableStatus;
  search?: number;
}

const applyFilters = (
  cryptoTable: CryptoTable[],
  filters: Filters
): CryptoTable[] => {
  return cryptoTable.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.occupied !== filters.status) {
      matches = false;
    }

    /*
    if (filters.search && cryptoOrder.user_name !== filters.search) {
      matches = false;
    }
    */

    if(filters.search && !(cryptoOrder.table_capacity.toString().includes(filters.search.toString())))
    {
      matches=false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoTable: CryptoTable[],
  page: number,
  limit: number
): CryptoTable[] => {
  return cryptoTable.slice(page * limit, page * limit + limit);
};

const VIPListTable: FC<VIPListTableProps> = ({ cryptoTable }) => {
  const [selectedCryptoTable, setSelectedCryptoTable] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoTable.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(24);
  const [filters, setFilters] = useState<Filters>({
    status: null,
    search: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: '全部'
    },
    {
      id: '空闲',
      name: '空闲'
    },
    {
      id: '占用',
      name: '占用'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      search: value
    }));
  };

  const handleSelectAllCryptoTable = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoTable(
      event.target.checked
        ? cryptoTable.map((cryptoOrder) => cryptoOrder.table_id.toString())
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoTable.includes(cryptoOrderId)) {
      setSelectedCryptoTable((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoTable((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoTable = applyFilters(cryptoTable, filters);
  const paginatedCryptoTable = applyPagination(
    filteredCryptoTable,
    page,
    limit
  );
  const selectedSomeCryptoTable =
    selectedCryptoTable.length > 0 &&
    selectedCryptoTable.length < cryptoTable.length;
  const selectedAllCryptoTable =
    selectedCryptoTable.length === cryptoTable.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={400}>
              <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }}>
                <TextField 
                id="outlined-basic" 
                label="搜索人数" 
                variant="outlined"
                onChange={handleSearchChange} 
                />
              </FormControl>

              <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }}>
                   <InputLabel >筛选</InputLabel>
                   <Select
                     value={filters.status || 'all'}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                   >
                    {statusOptions.map((statusOption) => (
                       <MenuItem key={statusOption.id} value={statusOption.id}>
                          {statusOption.name}
                      </MenuItem>
                    ))}
                   </Select>                            
              </FormControl>              
            </Box>
          }
          title="餐桌"
        />
      )}
      <Divider />

      <Box p={2}>    
      <Grid container spacing={1}>
      {paginatedCryptoTable.map((cryptoOrder) => {
              const isCryptoTableelected = selectedCryptoTable.includes(
                cryptoOrder.table_id.toString()
              );
              return (
                <Grid item xs={2}>
                  <IndividualTable 
                  table_id={cryptoOrder.table_id}
                  customer_number={cryptoOrder.customer_number}
                  table_capacity={cryptoOrder.table_capacity}
                  occupied={cryptoOrder.occupied}
                  />
                </Grid>
              );
            })}
      </Grid>
      </Box>

      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoTable.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[24, 48, 96]}
        />
      </Box>
    </Card>
  );
};

VIPListTable.propTypes = {
  cryptoTable: PropTypes.array.isRequired
};

VIPListTable.defaultProps = {
  cryptoTable: []
};

export default VIPListTable;
