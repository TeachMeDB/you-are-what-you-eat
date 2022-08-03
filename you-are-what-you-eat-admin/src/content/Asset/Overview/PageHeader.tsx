import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { queryAssetApi } from '@/queries/query_asset';

function PageHeader({ employees = [] }) {

  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState(
    { asset_id: '', asset_type: '', asset_status: '', employee_id: 0 });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    console.log(formValue, ' <-- formValue');
    await queryAssetApi.addAsset(formValue);
    setOpen(false);
  };

  const handleFormChange = (field, e) => {
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          资产信息
        </Typography>
        <Typography variant="subtitle2">
          查看并编辑所有资产信息
        </Typography>
      </Grid>

      <Grid item>

        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          新增资产
        </Button>
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
      </Grid>

    </Grid>
  );
}

export default PageHeader;
