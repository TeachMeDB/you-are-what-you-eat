import { Button, Grid, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { queryAssetApi } from '@/queries/query_asset';
import { styled } from '@mui/material/styles';
import { queryManageApi } from '@/queries/query_manage';
import { DesktopDatePicker } from '@mui/lab';
import { Box } from '@mui/system';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
      margin-bottom: 12px;
    }
`,
);

function PageHeader(props) {
  const {
    employees = [], assets = [], currentTab = 1,
    handleTabsChange, setAssetInfoes, setManageInfoes,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState(
    { assets_type: '', assets_status: '', employee_id: 0 });
  const [manageFormValue, setManageFormValue] = useState({
    employee_id: '',
    assets_id: '',
    manage_type: '',
    manage_date: new Date(),
    manage_reason: '',
    manage_cost: '',
  });
  console.log(employees, ' <-- manageFormValue');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    console.log(formValue, ' <-- formValue');
    const {
      // assets_id: assetsId = '',
      assets_type: assetsType = '',
      assets_status: assetsStatus = '',
      employee_id: employeeId = 0,
    } = formValue;
    await queryAssetApi.addAsset({ assetsType, assetsStatus, employeeId });
    const data = await queryAssetApi.getAssetList('');
    setAssetInfoes(data);
    setOpen(false);
  };
  const handleSubmitManageForm = async () => {
    console.log(manageFormValue, ' <-- manageFormValue');
    const { manage_date, ...params } = manageFormValue;
    await queryManageApi.addManage({ ...params, manage_date: format(manage_date, 'yyyy-MM-dd') });
    const data = await queryManageApi.getManageList();
    setManageInfoes(data);
    setOpen(false);
  };

  const handleFormChange = (field, e) => {
    console.log(e, ' <-- e');
    setFormValue({ ...formValue, [field]: e });
  };

  const handleManageFormChange = (field, e) => {
    setManageFormValue({ ...manageFormValue, [field]: e.target.value });
  };

  const handleDateChange = (e) => {
    setManageFormValue({ ...manageFormValue, manage_date: e });
  };

  const tabs = [
    { value: 1, label: '资产', description: '查看并编辑所有资产信息', addText: '新增资产' },
    { value: 2, label: '资产管理', description: '查看并编辑所有资产管理记录', addText: '新增资产管理记录' },
  ];

  const tab = tabs.find(item => item.value === currentTab);
  const assetsStatusItems = ['正常', '已坏'];

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <TabsWrapper
          onChange={(_, value) => handleTabsChange(value)}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </TabsWrapper>
        <Typography variant="subtitle2" style={{ marginTop: '12px' }}>
          {tab.description}
        </Typography>
      </Grid>

      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          {tab.addText}
        </Button>
        {
          currentTab === 1 ?
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>资产信息</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="assets_type"
                  label="新的资产类型"
                  fullWidth
                  variant="standard"
                  value={formValue.assets_type}
                  onChange={(e) => handleFormChange('assets_type', e)}
                  style={{ minWidth: '400px' }}
                />
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
            :
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>资产管理记录</DialogTitle>
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
                  value={manageFormValue.employee_id}
                  onChange={(e) => handleManageFormChange('employee_id', e)}
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
                  value={manageFormValue.assets_id}
                  onChange={(e) => handleManageFormChange('assets_id', e)}
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
                  value={manageFormValue.manage_type}
                  onChange={(e) => handleManageFormChange('manage_type', e)}
                />

                {/*<TextField*/}
                {/*  autoFocus*/}
                {/*  margin="dense"*/}
                {/*  id="manage_date"*/}
                {/*  label="资产管理日期"*/}
                {/*  fullWidth*/}
                {/*  variant="standard"*/}
                {/*  value={manageFormValue.manage_date}*/}
                {/*  onChange={(e) => handleManageFormChange('manage_date', e)}*/}
                {/*/>*/}
                <TextField
                  autoFocus
                  margin="dense"
                  id="manage_reason"
                  label="资产管理原因"
                  fullWidth
                  variant="standard"
                  value={manageFormValue.manage_reason}
                  onChange={(e) => handleManageFormChange('manage_reason', e)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="manage_cost"
                  label="资产管理耗费金额"
                  fullWidth
                  variant="standard"
                  value={manageFormValue.manage_cost}
                  onChange={(e) => handleManageFormChange('manage_cost', e)}
                />
                <Box
                  sx={{
                    marginTop: '16px',
                  }}
                >
                  <DesktopDatePicker
                    autoFocus
                    label="资产管理日期"
                    inputFormat="yyyy-MM-dd"
                    value={manageFormValue.manage_date}
                    onChange={(e) => handleDateChange(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>退出</Button>
                <Button onClick={handleSubmitManageForm}>确定</Button>
              </DialogActions>
            </Dialog>
        }
      </Grid>

    </Grid>
  );
}

export default PageHeader;
