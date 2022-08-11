import React, { ChangeEvent, FC, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { IngredientRecordInfo } from '@/models/ingredient_record_info';
import { EmployeeInfo } from '@/models/employee_info';
import { AssetInfo } from '@/models/asset_info';

interface IngredientRecordInfoTableProps {
  className?: string;
  ingredientRecordInfoes: IngredientRecordInfo[];
  employees: EmployeeInfo[];
  ingredients: AssetInfo[];
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

const RecentIngredientRecordTable: FC<IngredientRecordInfoTableProps> = (
  props
) => {
  const {
    ingredientRecordInfoes = [],
    ingredients = [],
    employees = [],
    setIngredientRecordInfoes
  } = props;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  // const [list, setList] = useState(ingredientRecordInfoes);
  // const [keyword, setKeyword] = useState('');
  // const [open, setOpen] = React.useState(false);
  // const [formValue, setFormValue] = useState({
  //   employee_id: 0,
  //   ingr_id: 0,
  //   ingredientRecord_type: '',
  //   ingredientRecord_date: '',
  //   ingredientRecord_reason: '',
  //   ingredientRecord_cost: '',
  // });

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  // const handleClickOpen = (ingredientRecordInfo) => {
  //   console.log(ingredientRecordInfo, ' <-- ingredientRecordInfo');
  //   setFormValue(ingredientRecordInfo);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
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

  // const handleFormChange = (field, e) => {
  //   console.log(field, ' <-- field');
  //   setFormValue({ ...formValue, [field]: e.target.value });
  // };

  // const handleSubmitForm = async () => {
  //   console.log(formValue, ' <-- ingredientRecordFormValue');
  //   // @ts-ignore
  //   const { ingr_name, ingr_type, ...params } = formValue;
  //   await queryIngredientRecordApi.addIngredientRecord(params);
  //   const data = await queryIngredientRecordApi.getIngredientRecordList();
  //   setIngredientRecordInfoes(data);
  //   setOpen(false);
  // };

  // const handleFormChange = (field, e) => {
  //   setFormValue({ ...formValue, [field]: e.target.value });
  // };

  // const handleDelete = async (id: string) => {
  //   await queryIngredientRecordApi.deleteIngredientRecord(id);
  // };

  const data = ingredientRecordInfoes.slice(page * limit, page * limit + limit);

  // const theme = useTheme();
  return (
    <Card>
      {
        <CardHeader
          // action={
          //   <FormControl variant="outlined" fullWidth>
          //     <OutlinedInputWrapper
          //       type="text"
          //       placeholder="输入资产名称"
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
          title="资产管理记录"
        />
      }
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
                      {ingredientRecordInfo.shelf_life}
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
                      {ingredientRecordInfo.price}
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
                      {ingredientRecordInfo.price}
                    </Typography>
                  </TableCell>

                  {/*<TableCell>*/}
                  {/*  <Tooltip title="编辑" arrow onClick={() => handleClickOpen(ingredientRecordInfo)}>*/}
                  {/*    <IconButton*/}
                  {/*      sx={{*/}
                  {/*        '&:hover': {*/}
                  {/*          background: theme.colors.primary.lighter,*/}
                  {/*        },*/}
                  {/*        color: theme.palette.primary.main,*/}
                  {/*      }}*/}
                  {/*      color="inherit"*/}
                  {/*      size="small"*/}
                  {/*    >*/}
                  {/*      <EditTwoToneIcon fontSize="small" />*/}
                  {/*    </IconButton>*/}
                  {/*  </Tooltip>*/}
                  {/*  <Dialog open={open} onClose={handleClose}>*/}
                  {/*    <DialogTitle>资产信息</DialogTitle>*/}
                  {/*    <DialogContent>*/}
                  {/*      <InputLabel id="employee_id">资产管理员</InputLabel>*/}
                  {/*      <Select*/}
                  {/*        autoFocus*/}
                  {/*        labelId="employee_id"*/}
                  {/*        margin="dense"*/}
                  {/*        id="employee_id"*/}
                  {/*        label="资产管理员"*/}
                  {/*        placeholder="资产管理员"*/}
                  {/*        fullWidth*/}
                  {/*        variant="standard"*/}
                  {/*        value={formValue.employee_id}*/}
                  {/*        onChange={(e) => handleFormChange('employee_id', e)}*/}
                  {/*      >*/}
                  {/*        {*/}
                  {/*          employees.map((employee) =>*/}
                  {/*            <MenuItem*/}
                  {/*              key={employee.employee_id}*/}
                  {/*              value={employee.employee_id}*/}
                  {/*            >{employee.ingr_name}</MenuItem>)*/}
                  {/*        }*/}
                  {/*      </Select>*/}
                  {/*      <InputLabel id="ingr_id">资产类型</InputLabel>*/}
                  {/*      <Select*/}
                  {/*        autoFocus*/}
                  {/*        labelId="ingr_id"*/}
                  {/*        margin="dense"*/}
                  {/*        id="ingr_id"*/}
                  {/*        label="资产类型"*/}
                  {/*        placeholder="资产类型"*/}
                  {/*        fullWidth*/}
                  {/*        variant="standard"*/}
                  {/*        value={formValue.ingr_id}*/}
                  {/*        onChange={(e) => handleFormChange('ingr_id', e)}*/}
                  {/*      >*/}
                  {/*        {*/}
                  {/*          ingredients.map((item) =>*/}
                  {/*            <MenuItem*/}
                  {/*              key={item.ingr_id}*/}
                  {/*              value={item.ingr_id}*/}
                  {/*            >{item.ingr_type}</MenuItem>)*/}
                  {/*        }*/}
                  {/*      </Select>*/}
                  {/*      <TextField*/}
                  {/*        autoFocus*/}
                  {/*        margin="dense"*/}
                  {/*        id="ingredientRecord_type"*/}
                  {/*        label="资产管理类型"*/}
                  {/*        fullWidth*/}
                  {/*        variant="standard"*/}
                  {/*        value={formValue.ingredientRecord_type}*/}
                  {/*        onChange={(e) => handleFormChange('ingredientRecord_type', e)}*/}
                  {/*      />*/}
                  {/*      <TextField*/}
                  {/*        autoFocus*/}
                  {/*        margin="dense"*/}
                  {/*        id="ingredientRecord_reason"*/}
                  {/*        label="资产管理原因"*/}
                  {/*        fullWidth*/}
                  {/*        variant="standard"*/}
                  {/*        value={formValue.ingredientRecord_reason}*/}
                  {/*        onChange={(e) => handleFormChange('ingredientRecord_reason', e)}*/}
                  {/*      />*/}
                  {/*      <TextField*/}
                  {/*        autoFocus*/}
                  {/*        margin="dense"*/}
                  {/*        id="ingredientRecord_cost"*/}
                  {/*        label="资产管理耗费金额"*/}
                  {/*        fullWidth*/}
                  {/*        variant="standard"*/}
                  {/*        value={formValue.ingredientRecord_cost}*/}
                  {/*        onChange={(e) => handleFormChange('ingredientRecord_cost', e)}*/}
                  {/*      />*/}
                  {/*    </DialogContent>*/}
                  {/*    <DialogActions>*/}
                  {/*      <Button onClick={handleClose}>退出</Button>*/}
                  {/*      <Button onClick={handleSubmitForm}>确定</Button>*/}
                  {/*    </DialogActions>*/}
                  {/*  </Dialog>*/}
                  {/*</TableCell>*/}
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
  ingredientRecordInfoes: PropTypes.array.isRequired
};

RecentIngredientRecordTable.defaultProps = {
  ingredientRecordInfoes: []
};

export default RecentIngredientRecordTable;
