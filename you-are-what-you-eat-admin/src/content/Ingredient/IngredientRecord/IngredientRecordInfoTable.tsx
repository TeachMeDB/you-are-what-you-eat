import React, { ChangeEvent, FC, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { IngredientRecordInfo } from '@/models/ingredient_record_info';
import { EmployeeInfo } from '@/models/employee_info';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { queryIngredientRecordApi } from '@/queries/query_ingredient_record';
import { IngredientInfo } from '@/models/ingredient_info';
import { DesktopDatePicker } from '@mui/lab';

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
    ingredients = [],
    employees = [],
    setIngredientRecordInfoes,
  } = props;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  // const [list, setList] = useState(ingredientRecordInfoes);
  // const [keyword, setKeyword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState({
    record_id: 0,
    ingr_id: 0,
    purchasing_date: null,
    measure_unit: '',
    shelf_life: '0',
    produced_date: null,
    price: '',
    director_id: 0,
  });

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  const handleClickOpen = (ingredientRecordInfo) => {
    console.log(ingredientRecordInfo, ' <-- ingredientRecordInfo');
    setFormValue(ingredientRecordInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleSubmit = async () => {
  //   console.log(formValue, ' <-- formValue');
  //   await queryIngredientRecordApi.updateIngredientRecord(formValue);
  //   setOpen(false);
  // };

  const handleFormDateChange = (field, e) => {
    setFormValue({ ...formValue, [field]: e });
  };

  // const handleSearch = async () => {
  //   const data = await queryIngredientRecordApi.getIngredientRecordList();
  //   setPage(0);
  //   setList(data);
  // };

  const handleFormChange = (field, e) => {
    console.log(field, ' <-- field');
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  const handleSubmitForm = async () => {
    console.log(formValue, ' <-- ingredientRecordFormValue');
    // @ts-ignore
    const { director_name, ingr_name, ...params } = formValue;
    await queryIngredientRecordApi.updateIngredientRecord(params);
    const data = await queryIngredientRecordApi.getIngredientRecordList();
    setIngredientRecordInfoes(data);
    setOpen(false);
  };

  const handleDelete = async (id: string | number) => {
    await queryIngredientRecordApi.deleteIngredientRecord(id);
    setIngredientRecordInfoes(ingredientRecordInfoes.filter(val => val.record_id !== id));
  };

  const data = ingredientRecordInfoes.slice(page * limit, page * limit + limit);

  const theme = useTheme();
  return (
    <Card>
      {(
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
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>记录编号</TableCell>
              <TableCell>原料名称</TableCell>
              <TableCell>购买日期</TableCell>
              <TableCell>原料的计量单位</TableCell>
              <TableCell>保质期</TableCell>
              <TableCell>生产日期</TableCell>
              <TableCell>价格</TableCell>
              <TableCell>负责人姓名</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ingredientRecordInfo) => {
              return (
                <TableRow
                  hover
                  key={`${ingredientRecordInfo.record_id}`}
                >
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
                    <Tooltip title="编辑" arrow onClick={() => handleClickOpen(ingredientRecordInfo)}>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>耗材信息</DialogTitle>
                      <DialogContent>
                        <TextField
                          disabled
                          margin="dense"
                          id="record_id"
                          label="记录编号"
                          fullWidth
                          variant="standard"
                          value={formValue.record_id}
                          style={{ minWidth: '400px' }}
                        />
                        <InputLabel id="employee_id">耗材</InputLabel>
                        <Select
                          autoFocus
                          labelId="employee_id"
                          margin="dense"
                          id="employee_id"
                          label="耗材"
                          placeholder="耗材"
                          fullWidth
                          variant="standard"
                          value={formValue.ingr_id}
                          onChange={(e) => handleFormChange('ingr_id', e)}
                        >
                          {
                            ingredients.map((item) =>
                              <MenuItem
                                key={item.ingr_id}
                                value={item.ingr_id}
                              >{item.ingr_name}</MenuItem>)
                          }
                        </Select>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="measure_unit"
                          label="原料的计量单位"
                          fullWidth
                          variant="standard"
                          value={formValue.measure_unit}
                          onChange={(e) => handleFormChange('measure_unit', e)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="shelf_life"
                          type="number"
                          label="保质期(天)"
                          fullWidth
                          variant="standard"
                          value={formValue.shelf_life}
                          onChange={(e) => handleFormChange('shelf_life', e)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="price"
                          label="价格"
                          type="number"
                          fullWidth
                          variant="standard"
                          value={formValue.price}
                          onChange={(e) => handleFormChange('price', e)}
                        />
                        <InputLabel id="employee_id">负责人</InputLabel>
                        <Select
                          autoFocus
                          labelId="employee_id"
                          margin="dense"
                          id="employee_id"
                          label="负责人"
                          placeholder="负责人"
                          fullWidth
                          variant="standard"
                          value={formValue.director_id}
                          onChange={(e) => handleFormChange('director_id', e)}
                        >
                          {
                            employees.map((employee) =>
                              <MenuItem
                                key={employee.employee_id}
                                value={employee.employee_id}
                              >{employee.employee_name}</MenuItem>)
                          }
                        </Select>
                        <Box
                          sx={{
                            marginTop: '16px',
                          }}
                        >
                          <DesktopDatePicker
                            autoFocus
                            label="购买日期"
                            inputFormat="yyyy-MM-dd"
                            value={formValue.purchasing_date}
                            onChange={(e) => handleFormDateChange('purchasing_date', e)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Box>
                        <Box
                          sx={{
                            marginTop: '16px',
                          }}
                        >
                          <DesktopDatePicker
                            autoFocus
                            label="生产日期"
                            inputFormat="yyyy-MM-dd"
                            value={formValue.produced_date}
                            onChange={(e) => handleFormDateChange('produced_date', e)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>退出</Button>
                        <Button onClick={handleSubmitForm}>确定</Button>
                      </DialogActions>
                    </Dialog>
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
