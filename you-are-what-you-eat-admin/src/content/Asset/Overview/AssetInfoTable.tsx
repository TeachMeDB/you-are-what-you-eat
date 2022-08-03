import React, { ChangeEvent, FC, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
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

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { AssetInfo } from '@/models/asset_info';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { queryAssetApi } from '@/queries/query_asset';
import { EmployeeInfo } from '@/models/employee_info';

interface AssetInfoTableProps {
  className?: string;
  assetInfoes: AssetInfo[];
  employees: EmployeeInfo[];
}

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `,
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `,
);

const RecentAssetsTable: FC<AssetInfoTableProps> = ({ assetInfoes, employees }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [list, setList] = useState(assetInfoes);
  const [keyword, setKeyword] = useState('');
  const [formValue, setFormValue] = useState(
    { asset_id: '', asset_type: '', asset_status: '', employee_id: 0 });
  const [open, setOpen] = React.useState(false);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  const handleClickOpen = (assetInfo) => {
    console.log(assetInfo, ' <-- assetInfo');
    setFormValue(assetInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    console.log(formValue, ' <-- formValue');
    await queryAssetApi.updateAsset(formValue);
    setOpen(false);
  };

  const handleSearch = async () => {
    const data = await queryAssetApi.getAssetList(keyword);
    setPage(0);
    setList(data);
  };

  const handleFormChange = (field, e) => {
    console.log(field, ' <-- field');
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  console.log(formValue, ' <-- formValue');
  const data = list.slice(page * limit, page * limit + limit);

  const theme = useTheme();
  return (
    <Card>
      {(
        <CardHeader
          action={
            <FormControl variant="outlined" fullWidth>
              <OutlinedInputWrapper
                type="text"
                placeholder="输入资产名称"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <ButtonSearch
                      variant="contained"
                      size="small"
                      onClick={handleSearch}
                    >
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
          title="资产信息列表"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>资产编号</TableCell>
              <TableCell>资产类型</TableCell>
              <TableCell>资产状态</TableCell>
              <TableCell>管理员</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((assetInfo) => {

              return (
                <TableRow
                  hover
                  key={assetInfo.assets_id}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {assetInfo.assets_id}
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
                      {assetInfo.assets_type}
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
                      {assetInfo.assets_status}
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
                      {assetInfo.employee_name}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Tooltip title="编辑" arrow onClick={() => handleClickOpen(assetInfo)}>
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
                    {
                      open &&
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>资产信息</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="asset_id"
                            label="新的资产编号"
                            fullWidth
                            variant="standard"
                            value={formValue.asset_id}
                            onChange={(e) => handleFormChange('asset_id', e)}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="asset_type"
                            label="新的资产类型"
                            fullWidth
                            variant="standard"
                            value={formValue.asset_type}
                            onChange={(e) => handleFormChange('asset_type', e)}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="asset_status"
                            label="新的资产状态"
                            fullWidth
                            variant="standard"
                            value={formValue.asset_status}
                            onChange={(e) => handleFormChange('asset_status', e)}
                          />
                          <InputLabel id="employee_id">新的资产管理员ID</InputLabel>
                          <Select
                            autoFocus
                            labelId="employee_id"
                            margin="dense"
                            id="employee_id"
                            label="新的资产管理员ID"
                            placeholder="新的资产管理员"
                            fullWidth
                            variant="standard"
                            value={formValue.employee_id}
                            onChange={(e) => handleFormChange('employee_id', e)}
                          >
                            {
                              employees.map((employee) =>
                                <MenuItem
                                  key={employee.employee_id}
                                  value={`${employee.employee_id}`}
                                >{employee.employee_name}</MenuItem>)
                            }
                          </Select>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>退出</Button>
                          <Button onClick={handleSubmit}>确定</Button>
                        </DialogActions>
                      </Dialog>
                    }
                    <Tooltip title="删除" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
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
          count={assetInfoes.length}
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

RecentAssetsTable.propTypes = {
  assetInfoes: PropTypes.array.isRequired,
};

RecentAssetsTable.defaultProps = {
  assetInfoes: [],
};

export default RecentAssetsTable;
