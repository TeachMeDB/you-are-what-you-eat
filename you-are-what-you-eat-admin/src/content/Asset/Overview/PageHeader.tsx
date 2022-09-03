import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

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
import { queryManageApi } from '@/queries/query_manage';
import { DesktopDatePicker } from '@mui/lab';

function PageHeader(props) {
  const {
    employees = [], assets = [], currentTab = 1,
    setAssetInfoes, setManageInfoes,
  } = props;
  const [open, setOpen] = React.useState(false);
  const defaultFormValue = { assets_type: '', assets_status: '', employee_id: 0 };
  const defaultFormErrors = { assets_type: '', assets_status: '', employee_id: '' };
  const [formValue, setFormValue] = useState(defaultFormValue);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);
  const defaultManageValue = {
    employee_id: '',
    assets_id: '',
    manage_type: '',
    manage_date: new Date(),
    manage_reason: '',
    manage_cost: '',
  };
  const defaultManageErrors = {
    employee_id: '',
    assets_id: '',
    manage_type: '',
    manage_date: '',
    manage_reason: '',
    manage_cost: '',
  };
  const [manageFormValue, setManageFormValue] = useState(defaultManageValue);
  const [manageFormErrors, setManageFormErrors] = useState(defaultManageErrors);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const {
      assets_type: assetsType = '',
      assets_status: assetsStatus = '',
      employee_id: employeeId = 0,
    } = formValue;
    setFormErrors({
      assets_type: !assetsType ? '资产类型不能为空' : '',
      assets_status: !assetsStatus ? '资产状态不能为空' : '',
      employee_id: !employeeId ? '资产管理员ID不能为空' : '',
    });
    if (!assetsType || !assetsStatus || !employeeId) {
      return;
    }

    const resp = await queryAssetApi.addAsset({ assetsType, assetsStatus, employeeId });
    if (!resp.ok) {
      alert('提交失败，请检查后重试');
      return;
    }
    const data = await queryAssetApi.getAssetList('');
    setAssetInfoes(data);
    setFormValue(defaultFormValue);
    setOpen(false);
  };
  const handleSubmitManageForm = async () => {
    const {
      employee_id,
      assets_id,
      manage_type,
      manage_date,
      manage_reason,
      manage_cost,
    } = manageFormValue;
    const costValue = parseFloat(manage_cost);
    setManageFormErrors({
      employee_id: !employee_id ? '请选择资产管理员' : '',
      assets_id: !assets_id ? '请选择资产类型' : '',
      manage_type: !manage_type ? '资产管理类型不能为空' : '',
      manage_cost: !manage_cost ? '请选择资产管理耗费金额' : (costValue < 0 ? '资产管理耗费金额不能小于0' : ''),
      manage_reason: !manage_reason ? '请选择资产管理原因' : '',
      manage_date: !manage_date ? '请选择资产管理日期' : '',
    });
    if (!employee_id || !assets_id || !manage_type || !manage_cost || !manage_reason || !manage_cost) {
      return;
    }
    await queryManageApi.addManage({
      ...manageFormValue,
      manage_date: format(manage_date, 'yyyy-MM-dd'),
    });
    const data = await queryManageApi.getManageList();
    setManageInfoes(data);
    setManageFormValue(defaultManageValue);
    setOpen(false);
  };

  const handleFormChange = (field, e) => {
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  const handleManageFormChange = (field, e) => {
    setManageFormValue({ ...manageFormValue, [field]: e.target.value });
  };

  const handleDateChange = (e) => {
    setManageFormValue({ ...manageFormValue, manage_date: e });
  };

  const tabs = [
    { value: 1, label: '资产', description: '查看并编辑所有资产信息', addText: '新增资产' },
    { value: 2, label: '资产管理记录', description: '查看并编辑所有资产管理记录', addText: '新增资产管理记录' },
  ];

  const tab = tabs.find((item) => item.value === currentTab);
  const assetsStatusItems = ['正常', '已坏'];

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {tab.label}
        </Typography>
        <Typography variant="subtitle2">
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
        {currentTab === 1 ? (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>资产信息</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="assets_type"
                label="资产类型"
                fullWidth
                variant="standard"
                value={formValue.assets_type}
                onChange={(e) => handleFormChange('assets_type', e)}
                style={{ minWidth: '400px' }}
                error={!!formErrors.assets_type}
                helperText={formErrors.assets_type}
              />

              <FormControl
                sx={{ width: '100%', marginTop: '12px' }}
                error={!!formErrors.assets_status}
              >
                <InputLabel id="assets_status">资产状态</InputLabel>
                <Select
                  autoFocus
                  labelId="assets_status"
                  margin="dense"
                  id="assets_status"
                  label="资产状态"
                  placeholder="资产状态"
                  value={formValue.assets_status}
                  onChange={(e) => handleFormChange('assets_status', e)}
                >
                  {assetsStatusItems.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formErrors.assets_status}</FormHelperText>
              </FormControl>

              <FormControl
                sx={{ width: '100%', marginTop: '12px' }}
                error={!!formErrors.employee_id}
              >
                <InputLabel id="employee_id">资产管理员ID</InputLabel>
                <Select
                  autoFocus
                  labelId="employee_id"
                  margin="dense"
                  id="employee_id"
                  label="资产管理员"
                  placeholder="资产管理员"
                  value={formValue.employee_id}
                  onChange={(e) => handleFormChange('employee_id', e)}
                >
                  {employees.map((employee) => (
                    <MenuItem
                      key={employee.employee_id}
                      value={employee.employee_id}
                    >
                      {employee.employee_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formErrors.employee_id}</FormHelperText>
              </FormControl>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>退出</Button>
              <Button onClick={handleSubmit}>确定</Button>
            </DialogActions>
          </Dialog>
        ) : (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>资产管理记录</DialogTitle>
            <DialogContent>
              <FormControl
                sx={{ width: '100%', marginTop: '12px' }}
                error={!!manageFormErrors.employee_id}
              >
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
                  {employees.map((employee) => (
                    <MenuItem
                      key={employee.employee_id}
                      value={employee.employee_id}
                    >
                      {employee.employee_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{manageFormErrors.employee_id}</FormHelperText>
              </FormControl>

              <FormControl
                sx={{ width: '100%', marginTop: '12px' }}
                error={!!manageFormErrors.assets_id}
              >
                <InputLabel id="assets_id">资产类型</InputLabel>
                <Select
                  autoFocus
                  labelId="assets_id"
                  margin="dense"
                  id="assets_id"
                  label="资产类型"
                  placeholder="资产类型"
                  value={manageFormValue.assets_id}
                  onChange={(e) => handleManageFormChange('assets_id', e)}
                >
                  {(assets || []).map((item) => (
                    <MenuItem key={item.assets_id} value={item.assets_id}>
                      {item.assets_type}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{manageFormErrors.assets_id}</FormHelperText>
              </FormControl>

              <TextField
                autoFocus
                margin="dense"
                id="manage_type"
                label="资产管理类型"
                fullWidth
                variant="standard"
                value={manageFormValue.manage_type}
                onChange={(e) => handleManageFormChange('manage_type', e)}
                error={!!manageFormErrors.manage_type}
                helperText={manageFormErrors.manage_type}
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
                error={!!manageFormErrors.manage_reason}
                helperText={manageFormErrors.manage_reason}
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
                error={!!manageFormErrors.manage_cost}
                helperText={manageFormErrors.manage_cost}
              />
              <FormControl
                sx={{ width: '100%', marginTop: '12px' }}
                error={!!manageFormErrors.manage_date}
              >
                <DesktopDatePicker
                  autoFocus
                  label="资产管理日期"
                  inputFormat="yyyy-MM-dd"
                  value={manageFormValue.manage_date}
                  onChange={(e) => handleDateChange(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormHelperText>{manageFormErrors.manage_date}</FormHelperText>
              </FormControl>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>退出</Button>
              <Button onClick={handleSubmitManageForm}>确定</Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
