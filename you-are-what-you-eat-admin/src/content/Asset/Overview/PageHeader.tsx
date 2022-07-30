import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { AssetInfo } from '@/models/asset_info';

let m: AssetInfo = {
  AssetsId: '123',
  AssetsName: '123',
  AssetsType: '123',
  AssetsDescription: '123',
  AssetsStatus: 12,
  EmployeeId: 12,
  EmployeeName: 'status',
};

function PageHeader() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleVerified = () => {
    console.log(m);
    setOpen(false);
  };
  const idInputChange = (e) => {

    m.AssetsId = e.target.value;
  };
  const nameInputChange = (e) => {
    m.AssetsName = e.target.value;
  };
  const typeInputChange = (e) => {
    m.AssetsType = e.target.value;
  };
  const descriptionInputChange = (e) => {
    m.AssetsDescription = e.target.value;
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
              id="assetsId"
              label="资产编号"
              fullWidth
              variant="standard"
              onChange={idInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="assetsName"
              label="资产名称"
              fullWidth
              variant="standard"
              onChange={nameInputChange}

            />
            <TextField
              autoFocus
              margin="dense"
              id="assetsDescription"
              label="资产描述"
              fullWidth
              variant="standard"
              onChange={descriptionInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="assetsType"
              label="资产类型"
              fullWidth
              variant="standard"
              onChange={typeInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>退出</Button>
            <Button onClick={handleVerified}>确定</Button>
          </DialogActions>
        </Dialog>
      </Grid>

    </Grid>
  );
}

export default PageHeader;
