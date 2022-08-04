import React, { ChangeEvent, FC, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
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
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { ManageInfo } from '@/models/manage_info';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { queryManageApi } from '@/queries/query_manage';
import { EmployeeInfo } from '@/models/employee_info';
import { AssetInfo } from '@/models/asset_info';

interface ManageInfoTableProps {
  className?: string;
  manageInfoes: ManageInfo[];
  employees: EmployeeInfo[];
  assets: AssetInfo[];
  setManageInfoes: any;
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

const RecentManageTable: FC<ManageInfoTableProps> = (props) => {
  const { manageInfoes = [], assets = [], employees = [], setManageInfoes } = props;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  // const [list, setList] = useState(manageInfoes);
  // const [keyword, setKeyword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState({
    employee_id: 0,
    assets_id: 0,
    manage_type: '',
    manage_date: '',
    manage_reason: '',
    manage_cost: '',
  });

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  const handleClickOpen = (manageInfo) => {
    console.log(manageInfo, ' <-- manageInfo');
    setFormValue(manageInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleSubmit = async () => {
  //   console.log(formValue, ' <-- formValue');
  //   await queryManageApi.updateManage(formValue);
  //   setOpen(false);
  // };

  // const handleSearch = async () => {
  //   const data = await queryManageApi.getManageList();
  //   setPage(0);
  //   setList(data);
  // };

  // const handleFormChange = (field, e) => {
  //   console.log(field, ' <-- field');
  //   setFormValue({ ...formValue, [field]: e.target.value });
  // };

  const handleSubmitForm = async () => {
    console.log(formValue, ' <-- manageFormValue');
    // @ts-ignore
    const { employee_name, assets_type, ...params } = formValue;
    await queryManageApi.addManage(params);
    const data = await queryManageApi.getManageList();
    setManageInfoes(data);
    setOpen(false);
  };

  const handleFormChange = (field, e) => {
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  // const handleDelete = async (id: string) => {
  //   await queryManageApi.deleteManage(id);
  // };

  const data = manageInfoes.slice(page * limit, page * limit + limit);

  const theme = useTheme();
  return (
    <Card>
      {(
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
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>资产管理员</TableCell>
              <TableCell>资产类型</TableCell>
              <TableCell>资产管理类型</TableCell>
              <TableCell>资产管理日期</TableCell>
              <TableCell>资产管理原因</TableCell>
              <TableCell>资产管理耗费金额</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((manageInfo) => {
              return (
                <TableRow
                  hover
                  key={`${manageInfo.assets_id}-${manageInfo.employee_id}-${manageInfo.manage_type}-${manageInfo.manage_date}`}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {manageInfo.employee_name}
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
                      {manageInfo.assets_type}
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
                      {manageInfo.manage_type}
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
                      {manageInfo.manage_date}
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
                      {manageInfo.manage_reason}
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
                      {manageInfo.manage_cost}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Tooltip title="编辑" arrow onClick={() => handleClickOpen(manageInfo)}>
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
                      <DialogTitle>资产信息</DialogTitle>
                      <DialogContent>
                        <InputLabel id="employee_id">资产管理员</InputLabel>
                        <Select
                          autoFocus
                          labelId="employee_id"
                          margin="dense"
                          id="employee_id"
                          label="资产管理员"
                          placeholder="资产管理员"
                          fullWidth
                          variant="standard"
                          value={formValue.employee_id}
                          onChange={(e) => handleFormChange('employee_id', e)}
                        >
                          {
                            employees.map((employee) =>
                              <MenuItem
                                key={employee.employee_id}
                                value={employee.employee_id}
                              >{employee.employee_name}</MenuItem>)
                          }
                        </Select>
                        <InputLabel id="assets_id">资产类型</InputLabel>
                        <Select
                          autoFocus
                          labelId="assets_id"
                          margin="dense"
                          id="assets_id"
                          label="资产类型"
                          placeholder="资产类型"
                          fullWidth
                          variant="standard"
                          value={formValue.assets_id}
                          onChange={(e) => handleFormChange('assets_id', e)}
                        >
                          {
                            assets.map((item) =>
                              <MenuItem
                                key={item.assets_id}
                                value={item.assets_id}
                              >{item.assets_type}</MenuItem>)
                          }
                        </Select>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="manage_type"
                          label="资产管理类型"
                          fullWidth
                          variant="standard"
                          value={formValue.manage_type}
                          onChange={(e) => handleFormChange('manage_type', e)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="manage_date"
                          label="资产管理日期"
                          fullWidth
                          variant="standard"
                          value={formValue.manage_date}
                          onChange={(e) => handleFormChange('manage_date', e)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="manage_reason"
                          label="资产管理原因"
                          fullWidth
                          variant="standard"
                          value={formValue.manage_reason}
                          onChange={(e) => handleFormChange('manage_reason', e)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="manage_cost"
                          label="资产管理耗费金额"
                          fullWidth
                          variant="standard"
                          value={formValue.manage_cost}
                          onChange={(e) => handleFormChange('manage_cost', e)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>退出</Button>
                        <Button onClick={handleSubmitForm}>确定</Button>
                      </DialogActions>
                    </Dialog>
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
          count={manageInfoes.length}
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

RecentManageTable.propTypes = {
  manageInfoes: PropTypes.array.isRequired,
};

RecentManageTable.defaultProps = {
  manageInfoes: [],
};

export default RecentManageTable;
