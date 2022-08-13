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
import { AssetInfo, Repair } from '@/models/asset_info';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BuildTwoTone from '@mui/icons-material/BuildTwoTone';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { queryAssetApi } from '@/queries/query_asset';
import { EmployeeInfo } from '@/models/employee_info';
import { Map, Marker } from 'react-amap';

interface AssetInfoTableProps {
  className?: string;
  assetInfoes: AssetInfo[];
  employees: EmployeeInfo[];
  setAssetInfoes: any;
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

const RecentAssetsTable: FC<AssetInfoTableProps> = ({ assetInfoes, employees, setAssetInfoes }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState('');
  const [formValue, setFormValue] = useState(
    { assets_id: '', assets_type: '', assets_status: '', employee_id: 0 });
  const [open, setOpen] = React.useState(false);
  const [repairOpen, setRepairOpen] = useState(false);
  const [repair, setRepair] = useState<Repair[]>([]);
  const [repairFormValue, setRepairFormValue] = useState(
    { name: '', phone: '', longitude: '', latitude: '' });
  const [repairFormVisible, setRepairFormVisible] = useState(false);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const assetsStatusItems = ['正常', '已坏'];

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  const handleClickOpen = (assetInfo) => {
    // console.log(assetInfo, ' <-- assetInfo');
    setFormValue(assetInfo);
    setOpen(true);
  };

  const handleOpenRepair = (assetInfo) => {
    setRepairOpen(true);
    setRepair(assetInfo.repair || []);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRepairClose = () => {
    setRepairOpen(false);
  };
  const handleSubmit = async () => {
    const {
      assets_id: assetsId = '',
      assets_type: assetsType = '',
      assets_status: assetsStatus = '',
      employee_id: employeeId = 0,
    } = formValue;
    await queryAssetApi.updateAsset({ assetsId, assetsType, assetsStatus, employeeId });
    const data = await queryAssetApi.getAssetList(keyword);
    setAssetInfoes(data);
    setOpen(false);
  };

  const handleSearch = async () => {
    const data = await queryAssetApi.getAssetList(keyword);
    setPage(0);
    setAssetInfoes(data);
  };

  const handleFormChange = (field, e) => {
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  const handleDelete = async (id: string) => {
    await queryAssetApi.deleteAsset(id);
    setAssetInfoes(assetInfoes.filter(val => val.assets_id != id));
  };

  const handleRepairFormChange = (field: string, e) => {
    setRepairFormValue({ ...repairFormValue, [field]: e.target.value });
  };

  const submitRepairForm = async () => {
    const { latitude, longitude, name, phone } = repairFormValue;
    if (!name || !phone || !latitude || !longitude) {
      return;
    }
    await queryAssetApi.addAssetRepair(repairFormValue);
    setRepair([
      ...repair,
      { ...repairFormValue, longitude: parseFloat(longitude), latitude: parseFloat(latitude) },
    ]);
    setRepairFormValue({ name: '', phone: '', longitude: '', latitude: '' });
    const data = await queryAssetApi.getAssetList(keyword);
    setAssetInfoes(data);
  };

  const data = assetInfoes.slice(page * limit, page * limit + limit);
  // .map(val => {
  //   val.repair = [
  //     {
  //       name: '上海市嘉定区安亭镇曹安公路4800号',
  //       phone: '13907589021',
  //       longitude: 121.21792,
  //       latitude: 31.28698,
  //     },
  //     {
  //       name: '上海市嘉定区嘉松北路6130弄',
  //       phone: '17809563528',
  //       longitude: 121.22216,
  //       latitude: 31.28826,
  //     },
  //     {
  //       name: '上海市嘉定区雅丹路673号',
  //       phone: '189086902367',
  //       longitude: 121.19936,
  //       latitude: 31.29346,
  //     },
  //     {
  //       name: '上海市嘉定区绿苑路587号',
  //       phone: '18200985623',
  //       longitude: 121.21105,
  //       latitude: 31.28032,
  //     },
  //   ];
  //   return val;
  // });

  const mapCenter = (points?: Repair[]) => {
    if (!points || points.length === 0) {
      return { longitude: 121.21000, latitude: 31.28698 };
    }
    console.log(points, ' <-- points');
    return {
      longitude: points.reduce((prev, curr) => prev + curr.longitude, 0) / points.length,
      latitude: points.reduce((prev, curr) => prev + curr.latitude, 0) / points.length,
    };
  };

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
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>资产信息</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          disabled
                          margin="dense"
                          id="assets_id"
                          label="资产编号"
                          fullWidth
                          variant="standard"
                          value={formValue.assets_id}
                          style={{ minWidth: '400px' }}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="assets_type"
                          label="新的资产类型"
                          fullWidth
                          variant="standard"
                          value={formValue.assets_type}
                          onChange={(e) => handleFormChange('assets_type', e)}
                        />
                        {/*<TextField*/}
                        {/*  autoFocus*/}
                        {/*  margin="dense"*/}
                        {/*  id="assets_status"*/}
                        {/*  label="新的资产状态"*/}
                        {/*  fullWidth*/}
                        {/*  variant="standard"*/}
                        {/*  value={formValue.assets_status}*/}
                        {/*  onChange={(e) => handleFormChange('assets_status', e)}*/}
                        {/*/>*/}
                        <InputLabel id="assets_status">新的资产状态</InputLabel>
                        <Select
                          autoFocus
                          labelId="assets_status"
                          margin="dense"
                          id="assets_status"
                          label="新的资产状态"
                          placeholder="新的资产状态"
                          fullWidth
                          variant="standard"
                          value={formValue.assets_status}
                          onChange={(e) => handleFormChange('assets_status', e)}
                        >
                          {
                            assetsStatusItems.map((item) =>
                              <MenuItem
                                key={item}
                                value={item}
                              >{item}</MenuItem>)
                          }
                        </Select>
                        <InputLabel id="employee_id">新的资产管理员ID</InputLabel>
                        <Select
                          autoFocus
                          labelId="employee_id"
                          margin="dense"
                          id="employee_id"
                          label="新的资产管理员"
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
                                value={employee.employee_id}
                              >{employee.employee_name}</MenuItem>)
                          }
                        </Select>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>退出</Button>
                        <Button onClick={handleSubmit}>确定</Button>
                      </DialogActions>
                    </Dialog>
                    <Tooltip title="报修" arrow onClick={() => handleOpenRepair(assetInfo)}>
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
                        <BuildTwoTone fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Dialog open={repairOpen} onClose={handleRepairClose}>
                      <DialogTitle>资产报修</DialogTitle>
                      <DialogContent>
                        {/*<TableContainer>*/}
                        {/*  <Table>*/}
                        {/*    <TableHead>*/}
                        {/*      <TableRow>*/}
                        {/*        <TableCell>序号</TableCell>*/}
                        {/*        <TableCell>维修点</TableCell>*/}
                        {/*        <TableCell>联系方式</TableCell>*/}
                        {/*      </TableRow>*/}
                        {/*    </TableHead>*/}
                        {/*    <TableBody>*/}
                        {/*      {*/}
                        {/*        repairs.map((val, i) =>*/}
                        {/*          <TableRow*/}
                        {/*            hover*/}
                        {/*            key={val.name}*/}
                        {/*          >*/}
                        {/*            <TableCell>*/}
                        {/*              <Typography*/}
                        {/*                variant="body2"*/}
                        {/*                fontWeight="bold"*/}
                        {/*                color="text.primary"*/}
                        {/*                gutterBottom*/}
                        {/*                noWrap*/}
                        {/*              >*/}
                        {/*                {i + 1}*/}
                        {/*              </Typography>*/}
                        {/*            </TableCell>*/}
                        {/*            <TableCell>*/}
                        {/*              <Typography*/}
                        {/*                variant="body2"*/}
                        {/*                fontWeight="bold"*/}
                        {/*                color="text.primary"*/}
                        {/*                gutterBottom*/}
                        {/*                noWrap*/}
                        {/*              >*/}
                        {/*                {val.name}*/}
                        {/*              </Typography>*/}
                        {/*            </TableCell>*/}
                        {/*            <TableCell>*/}
                        {/*              <Typography*/}
                        {/*                variant="body2"*/}
                        {/*                fontWeight="bold"*/}
                        {/*                color="text.primary"*/}
                        {/*                gutterBottom*/}
                        {/*                noWrap*/}
                        {/*              >*/}
                        {/*                {val.phone}*/}
                        {/*              </Typography>*/}
                        {/*            </TableCell>*/}
                        {/*          </TableRow>,*/}
                        {/*        )*/}
                        {/*      }*/}
                        {/*    </TableBody>*/}
                        {/*  </Table>*/}
                        {/*</TableContainer>*/}
                        <div style={{ height: '600px' }}>
                          <div style={{ width: '540px', height: '400px' }}>
                            <Map
                              amapkey={'7f7527142abd6382ecc1950a2d568888'}
                              version={'1.4.0'}
                              plugins={['ToolBar']}
                              center={mapCenter(repair)}
                              zoom={12}
                            >
                              {
                                (repair || []).map((val, i) =>
                                  <Marker
                                    key={val.name}
                                    position={{ longitude: val.longitude, latitude: val.latitude }}
                                    label={{ content: i + 1, offset: { x: 2, y: -25 } }}
                                    title={`${val.name}\n联系方式： ${val.phone}`}
                                  />,
                                )
                              }
                            </Map>
                          </div>
                          <div
                            style={{
                              marginTop: '12px',
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => setRepairFormVisible(true)}
                            >添加维修点</Button>
                          </div>
                          {
                            repairFormVisible &&
                            <div style={{ marginTop: '12px', height: '200px' }}>
                              <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="维修点地址"
                                fullWidth
                                variant="standard"
                                value={repairFormValue.name}
                                onChange={(e) => handleRepairFormChange('name', e)}
                              />
                              <TextField
                                margin="dense"
                                id="phone"
                                label="联系方式"
                                fullWidth
                                variant="standard"
                                onChange={(e) => handleRepairFormChange('phone', e)}
                              />
                              <TextField
                                margin="dense"
                                id="name"
                                label="经度"
                                fullWidth
                                variant="standard"
                                value={repairFormValue.longitude}
                                onChange={(e) => handleRepairFormChange('longitude', e)}
                              />
                              <TextField
                                margin="dense"
                                id="name"
                                label="维度"
                                fullWidth
                                variant="standard"
                                value={repairFormValue.latitude}
                                onChange={(e) => handleRepairFormChange('latitude', e)}
                              />
                              <div>提示：经纬度可通过<a
                                href="https://jingweidu.bmcx.com/"
                                target="_blank"
                              >此链接</a>查询
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                  variant="contained"
                                  onClick={submitRepairForm}
                                >提交</Button>
                              </div>
                            </div>
                          }
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleRepairClose}>退出</Button>
                        <Button onClick={handleRepairClose}>确定</Button>
                      </DialogActions>
                    </Dialog>
                    <Tooltip title="删除" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDelete(assetInfo.assets_id)}
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
