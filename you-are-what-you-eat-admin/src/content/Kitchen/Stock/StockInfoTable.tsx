import React from 'react';

import { ChangeEvent, useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  Card,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  styled,
  InputAdornment,
  Typography,
  useTheme,
  CardHeader,
  OutlinedInput
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { StockInfo, SurplusUpload, StockInfoData } from '@/models/stock_info';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';


import { stockInfoApi } from '@/queries/stock';
import { useRefMounted } from '@/hooks/useRefMounted';


let AllStockInfoDataName: string[] = [];

const applyPagination = (
  stockInfoes: StockInfoData[],
  page: number,
  limit: number
): StockInfoData[] => {
  return stockInfoes.slice(page * limit, page * limit + limit);
};








const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);




const StockInfoesTable = () => {





  const isMountedRef = useRefMounted();
  const [StockInfoes, setStockInfoes] = useState<StockInfo[]>([]);
  const [SearchStockInfoes, setSearchStockInfoes] = useState<StockInfo[]>([]);

  const getAllData = useCallback(async () => {
    try {

      let stockInfoes = await stockInfoApi.getStockInfo();
      if (isMountedRef()) {
        setStockInfoes(stockInfoes);
        setSearchStockInfoes(stockInfoes);
      }
    } catch (err) {
      alert(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);




  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [idChange, setidChange] = useState<string>('');
  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);

  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  StockInfoes.map((item) => {
    if (AllStockInfoDataName.indexOf(item.ing_name) == -1)
      AllStockInfoDataName.push(item.ing_name);
  })
  let i = 1;
  StockInfoes.map((item) => {
    if (item.ing_name == "羊肉")
      i += item.surplus;
  })


  let AllStockInfoDataCount: number[] = [];
  for (let i = 0; i < AllStockInfoDataName.length; i++) {
    AllStockInfoDataCount[i] = 0;
  }
  StockInfoes.map((item) => {

    for (let i = 0; i < AllStockInfoDataName.length; i++) {
      if (item.ing_name == AllStockInfoDataName[i]) {

        AllStockInfoDataCount[i] += item.surplus;
        AllStockInfoDataCount[i] += item.amount;
      }
    }
  })


  let ALL: StockInfoData[] = [];

  for (let j = 0; j < AllStockInfoDataName.length; j++) {
    let item: StockInfoData = {
      ing_name: "",
      amount: 0
    };
    item.amount = AllStockInfoDataCount[j];
    item.ing_name = AllStockInfoDataName[j];
    ALL.push(item);

  }
  console.log("miingzi");
  console.log(ALL);

  console.log("miingzi");
  console.log("miingzi");
  const paginatedPromotions = applyPagination(ALL, page, limit);

  var Search: string;

  let newM: StockInfo[] = [];
  const handleSearchChange = (e) => {
    newM = [];
    Search = e.target.value;
    SearchStockInfoes.map((item) => {
      if (item.ing_name.indexOf(Search) != -1)
        newM.push(item);
    })
  }
  const handleSearchClick = () => {
    setStockInfoes(newM);
  }
  let s: SurplusUpload = {
    record_id: "",
    surplus: 0
  };
  const surplusChange = (e) => {
    s.surplus = parseInt(e.target.value);

  }




  return (
    <Card>
      {(

        <CardHeader
          action={
            <FormControl variant="outlined" fullWidth>
              <OutlinedInputWrapper
                onChange={handleSearchChange}
                type="text"
                placeholder="输入原料名称"
                endAdornment={
                  <InputAdornment position="end">
                    <ButtonSearch variant="contained" size="small" onClick={handleSearchClick} >
                      搜索
                    </ButtonSearch>

                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          }
          title="库存信息列表"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>


              <TableCell>原料名称</TableCell>



              <TableCell>当前库存</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>

            {paginatedPromotions.map((stockInfo) => {
              return (
                <TableRow
                  hover
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {stockInfo.ing_name}
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
                      {stockInfo.amount}
                    </Typography>
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
          count={ALL.length}
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

StockInfoesTable.propTypes = {
  stockInfoes: PropTypes.array.isRequired
};

StockInfoesTable.defaultProps = {
  stockInfoes: []
};

export default StockInfoesTable;
