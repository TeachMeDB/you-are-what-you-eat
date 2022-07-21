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
import { CryptoVip,CryptoVipStatus } from '@/models/crypto_vip';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BulkActions from './BulkActions';
import TextField from '@mui/material/TextField';

interface VIPListTableProps {
  className?: string;
  cryptoVip: CryptoVip[];
}

interface Filters {
  status?: CryptoVipStatus;
}

const getStatusLabel = (cryptoVipStatus: CryptoVipStatus): JSX.Element => {
  const map = {
    注销: {
      text: '注销',
      color: 'error'
    },
    正常: {
      text: '正常',
      color: 'primary'
    },
    冻结: {
      text: '冻结',
      color: 'warning'
    }
  };

  const { text, color }: any = map[cryptoVipStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoVip: CryptoVip[],
  filters: Filters
): CryptoVip[] => {
  return cryptoVip.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoVip: CryptoVip[],
  page: number,
  limit: number
): CryptoVip[] => {
  return cryptoVip.slice(page * limit, page * limit + limit);
};

const VIPListTable: FC<VIPListTableProps> = ({ cryptoVip }) => {
  const [selectedCryptoVip, setSelectedCryptoVip] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoVip.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: '全部'
    },
    {
      id: '正常',
      name: '正常'
    },
    {
      id: '冻结',
      name: '冻结'
    },
    {
      id: '注销',
      name: '注销'
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

  const handleSelectAllCryptoVip = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoVip(
      event.target.checked
        ? cryptoVip.map((cryptoOrder) => cryptoOrder.user_name)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoVip.includes(cryptoOrderId)) {
      setSelectedCryptoVip((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoVip((prevSelected) =>
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

  const filteredCryptoVip = applyFilters(cryptoVip, filters);
  const paginatedCryptoVip = applyPagination(
    filteredCryptoVip,
    page,
    limit
  );
  const selectedSomeCryptoVip =
    selectedCryptoVip.length > 0 &&
    selectedCryptoVip.length < cryptoVip.length;
  const selectedAllCryptoVip =
    selectedCryptoVip.length === cryptoVip.length;
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
                <TextField id="outlined-basic" label="搜索" variant="outlined" />
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
          title="会员"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoVip}
                  indeterminate={selectedSomeCryptoVip}
                  onChange={handleSelectAllCryptoVip}
                />
              </TableCell>
              <TableCell>用户名</TableCell>
              <TableCell>出生日期</TableCell>
              <TableCell>性别</TableCell>
              <TableCell align="right">余额</TableCell>
              <TableCell align="right">状态</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoVip.map((cryptoOrder) => {
              const isCryptoVipelected = selectedCryptoVip.includes(
                cryptoOrder.user_name
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.user_name}
                  selected={isCryptoVipelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoVipelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, cryptoOrder.user_name)
                      }
                      value={isCryptoVipelected}
                    />
                  </TableCell>
                  
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.user_name}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.birthday}
                    </Typography>
                    {/*<Typography variant="body2" color="text.secondary" noWrap>
                      {format(cryptoOrder.creation_time, 'MMMM dd yyyy')}
                    </Typography>*/}
                  </TableCell>
                  
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.gender==1?'男':'女'}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Number(cryptoOrder.credit).toFixed(2) }
                    </Typography>
                  </TableCell>

                  {/* 
                   <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.amountCrypto}
                      {cryptoOrder.cryptoCurrency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(cryptoOrder.amount).format(
                        `${cryptoOrder.currency}0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  */}
                  
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.status)}
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="查看详情" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <RemoveRedEyeIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="编辑" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoVip.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

VIPListTable.propTypes = {
  cryptoVip: PropTypes.array.isRequired
};

VIPListTable.defaultProps = {
  cryptoVip: []
};

export default VIPListTable;
