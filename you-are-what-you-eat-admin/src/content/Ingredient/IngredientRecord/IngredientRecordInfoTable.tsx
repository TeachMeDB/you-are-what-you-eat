import React, { ChangeEvent, FC, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { IngredientRecordInfo } from '@/models/ingredient_record_info';
import { EmployeeInfo } from '@/models/employee_info';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { queryIngredientRecordApi } from '@/queries/query_ingredient_record';
import { IngredientInfo } from '@/models/ingredient_info';

interface IngredientRecordInfoTableProps {
  className?: string;
  ingredientRecordInfoes: IngredientRecordInfo[];
  employees: EmployeeInfo[];
  ingredients: IngredientInfo[];
  setIngredientRecordInfoes: any;
}

// const OutlinedInputWrapper = styled(OutlinedInput)(
//   ({ theme }) => `
//       background-color: ${theme.colors.alpha.white[100]};
//   `,
// );

// const ButtonSearch = styled(Button)(
//   ({ theme }) => `
//       margin-right: -${theme.spacing(1)};
//   `,
// );

const RecentIngredientRecordTable: FC<IngredientRecordInfoTableProps> = (props) => {
  const {
    ingredientRecordInfoes = [],
    setIngredientRecordInfoes,
  } = props;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  // const [list, setList] = useState(ingredientRecordInfoes);
  // const [keyword, setKeyword] = useState('');

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  // const handleSubmit = async () => {
  //   console.log(formValue, ' <-- formValue');
  //   await queryIngredientRecordApi.updateIngredientRecord(formValue);
  //   setOpen(false);
  // };

  // const handleSearch = async () => {
  //   const data = await queryIngredientRecordApi.getIngredientRecordList();
  //   setPage(0);
  //   setList(data);
  // };

  const handleDelete = async (id: string | number) => {
    await queryIngredientRecordApi.deleteIngredientRecord(id);
    setIngredientRecordInfoes(ingredientRecordInfoes.filter(val => val.record_id !== id));
  };

  const data = ingredientRecordInfoes.slice(page * limit, page * limit + limit);

  const theme = useTheme();
  return (
    <Card>
      {
        <CardHeader
          // action={
          //   <FormControl variant="outlined" fullWidth>
          //     <OutlinedInputWrapper
          //       type="text"
          //       placeholder="输入耗材名称"
          //       value={keyword}
          //       onChange={(e) => setKeyword(e.target.value)}
          //       endAdornment={
          //         <InputAdornment position="end">
          //           <ButtonSearch
          //             variant="contained"
          //             size="small"
          //             onClick={handleSearch}
          //           >
          //             搜索
          //           </ButtonSearch>
          //         </InputAdornment>
          //       }
          //       startAdornment={
          //         <InputAdornment position="start">
          //           <SearchTwoToneIcon />
          //         </InputAdornment>
          //       }
          //     />
          //   </FormControl>
          // }
          title="耗材管理记录"
        />
      }
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>记录编号</TableCell>
              <TableCell>原料名称</TableCell>
              <TableCell>修改日期</TableCell>
              <TableCell>采购/消耗</TableCell>
              <TableCell>数量</TableCell>
              <TableCell>单位</TableCell>
              <TableCell>生产日期</TableCell>
              <TableCell>保质期</TableCell>
              <TableCell>价格</TableCell>
              <TableCell>负责人姓名</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ingredientRecordInfo) => {
              return (
                <TableRow hover key={`${ingredientRecordInfo.record_id}`}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ingredientRecordInfo.record_id}
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
                      {ingredientRecordInfo.ingr_name}
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
                      {ingredientRecordInfo.purchasing_date}
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
                      {ingredientRecordInfo.purchases !== 0 ? '采购' : '消耗'}
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
                      {ingredientRecordInfo.purchases !== 0 ? ingredientRecordInfo.purchases : ingredientRecordInfo.surplus}
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
                      {ingredientRecordInfo.measure_unit}
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
                      {ingredientRecordInfo.produced_date}
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
                      {ingredientRecordInfo.shelf_life}天
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
                      {ingredientRecordInfo.price}元
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
                      {ingredientRecordInfo.director_name}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Tooltip arrow title="删除">
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDelete(ingredientRecordInfo.record_id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
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
          count={ingredientRecordInfoes.length}
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

RecentIngredientRecordTable.propTypes = {
  ingredientRecordInfoes: PropTypes.array.isRequired,
};

RecentIngredientRecordTable.defaultProps = {
  ingredientRecordInfoes: [],
};

export default RecentIngredientRecordTable;
