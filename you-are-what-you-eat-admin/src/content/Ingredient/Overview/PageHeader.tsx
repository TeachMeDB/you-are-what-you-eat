import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { IngredientInfo } from '@/models/ingredient_info';

let m: IngredientInfo = {
  ingr_id: '123',
  ingr_name: '123',
  ingr_type: 123,
  ingr_description: '123',
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

    m.ingr_id = e.target.value;
  };
  const nameInputChange = (e) => {
    m.ingr_name = e.target.value;
  };
  const typeInputChange = (e) => {
    m.ingr_type = Number(e.target.value);
  };
  const descriptionInputChange = (e) => {
    m.ingr_description = e.target.value;
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          耗材信息
        </Typography>
        <Typography variant="subtitle2">
          查看并编辑所有耗材信息
        </Typography>
      </Grid>

      <Grid item>

        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          新增耗材
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>耗材信息</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="ingrId"
              label="耗材编号"
              fullWidth
              variant="standard"
              onChange={idInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="ingrName"
              label="耗材名称"
              fullWidth
              variant="standard"
              onChange={nameInputChange}

            />
            <TextField
              autoFocus
              margin="dense"
              id="ingrDescription"
              label="耗材描述"
              fullWidth
              variant="standard"
              onChange={descriptionInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="ingrType"
              label="耗材类型"
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
