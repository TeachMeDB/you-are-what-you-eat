import * as React from 'react';
import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Button,
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import Label from '@/components/Label';
import {
  CryptoDishOrder,
  CryptoDishOrderStatus
} from '@/models/crypto_dishOrder';
import { CryptoOrderEdit, CryptoOrderStatus } from '@/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BulkActions from './BulkActions';
import TextField from '@mui/material/TextField';
import { queryOrderApi } from '@/queries/query_order';

import FullOrderView from './FullOrderView';


interface RecentOrdersTableProps {
  cryptoDishOrder: CryptoDishOrder[];
  cryptoOrder:CryptoOrder;
}

interface Filters {
  status?: CryptoDishOrderStatus;
  search?: string;
}

const getStatusLabel = (
  cryptoDishOrderStatus: CryptoDishOrderStatus
): JSX.Element => {
  const map = {
    待处理: {
      text: '待处理',
      color: 'error'
    },
    已完成: {
      text: '已完成',
      color: 'success'
    },
    制作中: {
      text: '制作中',
      color: 'warning'
    }
  };

  const { text, color }: any = map[cryptoDishOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoDishOrder: CryptoDishOrder[],
  filters: Filters
): CryptoDishOrder[] => {
  return cryptoDishOrder.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.dish_status !== filters.status) {
      matches = false;
    }

    /*
    if (filters.search && cryptoOrder.order_id !== filters.search) {
      matches = false;
    }
    */

    if (filters.search && !cryptoOrder.dish_order_id.includes(filters.search)) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoDishOrder: CryptoDishOrder[],
  page: number,
  limit: number
): CryptoDishOrder[] => {
  return cryptoDishOrder.slice(page * limit, page * limit + limit);
};

const DishOrderTable: FC<RecentOrdersTableProps> = ({ cryptoDishOrder,cryptoOrder }) => {
  const [selectedCryptoDishOrders, setSelectedCryptoDishOrders] = useState<
    string[]
  >([]);
  const selectedBulkActions = selectedCryptoDishOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const [open, setOpen] = React.useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);

  };
  const handleSuccessClose = () => {
    setOpen(false);
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);

    window.location.reload();
  };
  const handleConfirm = async() =>{
    let sub:CryptoOrderEdit={
      order_id:cryptoOrder.order_id,
      creation_time:cryptoOrder.creation_time,
      table_id:cryptoOrder.table_id,
      order_status:"已支付"
    }
    try {
      let res = await queryOrderApi.editOrder(sub);
      console.log(res);
      setOpenSuccessDialog(true);
      //window.location.reload();
    } catch (err) {
      console.error(err);
      setOpenErrorDialog(true);
    }
  }

  const statusOptions = [
    {
      id: 'all',
      name: '全部'
    },
    {
      id: '待处理',
      name: '待处理'
    },
    {
      id: '已完成',
      name: '已完成'
    },
    {
      id: '制作中',
      name: '制作中'
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

  const handleSelectAllCryptoDishOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoDishOrders(
      event.target.checked
        ? cryptoDishOrder.map((cryptoOrder) => cryptoOrder.order_id)
        : []
    );
  };

  const handleSelectOneCryptoDishOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoDishOrders.includes(cryptoOrderId)) {
      setSelectedCryptoDishOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoDishOrders((prevSelected) =>
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

  const filteredCryptoDishOrders = applyFilters(cryptoDishOrder, filters);
  const paginatedCryptoDishOrders = applyPagination(
    filteredCryptoDishOrders,
    page,
    limit
  );
  const selectedSomeCryptoDishOrders =
    selectedCryptoDishOrders.length > 0 &&
    selectedCryptoDishOrders.length < cryptoDishOrder.length;
  const selectedAllCryptoDishOrders =
    selectedCryptoDishOrders.length === cryptoDishOrder.length;
  const theme = useTheme();

  return (
    <div>
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={600}>
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <TextField
                  id="outlined-basic"
                  label="搜索点菜号"
                  variant="outlined"
                  onChange={handleSearchChange}
                />
              </FormControl>

              <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>筛选</InputLabel>
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
              
              <FormControl variant="outlined" sx={{ m: 1.25, minWidth: 60 }}>
                {cryptoOrder.order_status=="已支付"?
                <Button variant="contained" size='large' disabled>
                 订单已支付
                </Button>
                :
                <Button variant="contained" size='large' onClick={handleClickOpen}>
                  支付订单
                </Button>
                }
                
              </FormControl>
            </Box>
          }
          title="订单详情"
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
                  checked={selectedAllCryptoDishOrders}
                  indeterminate={selectedSomeCryptoDishOrders}
                  onChange={handleSelectAllCryptoDishOrders}
                />
              </TableCell>
              <TableCell>点菜号</TableCell>
              <TableCell>所属订单</TableCell>
              <TableCell>菜谱号</TableCell>
              <TableCell>菜品名称</TableCell>
              <TableCell align="right">结算价格</TableCell>
              <TableCell align="right">状态</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoDishOrders.map((cryptoOrder) => {
              const isCryptoDishOrderSelected =
                selectedCryptoDishOrders.includes(cryptoOrder.order_id);
              return (
                <TableRow
                  hover
                  key={cryptoOrder.order_id}
                  selected={isCryptoDishOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoDishOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoDishOrder(
                          event,
                          cryptoOrder.dish_order_id
                        )
                      }
                      value={isCryptoDishOrderSelected}
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
                      {cryptoOrder.dish_order_id}
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
                      {cryptoOrder.order_id}
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
                      {cryptoOrder.dish_id}
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
                      {cryptoOrder.dish_name}
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
                      {Number(cryptoOrder.final_payment).toFixed(2)}
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
                    {getStatusLabel(cryptoOrder.dish_status)}
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
          count={filteredCryptoDishOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant='h4'>{'请确认'}</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            确认该订单已支付？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            否
          </Button>
          <Button onClick={handleConfirm} autoFocus variant='contained'>
            是
          </Button>
        </DialogActions>
      </Dialog>

    <Dialog
        open={openSuccessDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant='h4'>{'支付成功'}</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            该订单已支付
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openErrorDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant='h4'>{'支付错误'}</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            修改支付状态失败
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

</div>
  );
};

DishOrderTable.propTypes = {
  cryptoDishOrder: PropTypes.array.isRequired
};

DishOrderTable.defaultProps = {
  cryptoDishOrder: []
};

export default DishOrderTable;
