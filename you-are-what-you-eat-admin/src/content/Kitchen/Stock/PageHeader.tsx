import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { DesktopDatePicker } from '@mui/lab';
import { StockInfo } from '@/models/stock_info';
import { Box } from '@mui/system';
import { stockInfoApi } from '@/queries/stock';

let n: StockInfo = {
  "amount": 0,
  "date": "",
  "ing_name": "",
  "record_id": "",
  "surplus": 0
}

function StockPageHeader() {

  var a = new Date();

  const [date, setDate] = React.useState(a);
  n.date = date.toString();
  const [open, setOpen] = React.useState(false);

  const [judgeID, setJudgeID] = React.useState(false);
  const [judgeAmount, setJudgeAmount] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const handleAmountChange = (e) => {
    n.amount = parseInt(e.target.value);
    n.surplus = n.amount;
    var rex = /^[0-9]+$/;//正则表达式
    var flag = (rex.test(n.amount.toString()));//通过表达式进行匹配
    if (flag) {
      setJudgeAmount(false);
    }

    else {
      setJudgeAmount(true);
    }
  }

  const handleDateChange = (e) => {
    setDate(e);
    n.date = date.toString();
    console.log(n.date);
  };
  const handleNameChange = (e) => {
    n.ing_name = e.target.value;
  }
  const handleIdChange = (e) => {
    n.record_id = e.target.value;
    var rex = /^[0-9]+$/;//正则表达式
    var flag = (rex.test(n.record_id.toString()));//通过表达式进行匹配
    if (flag) {
      setJudgeID(false);
    }

    else {
      setJudgeID(true);
    }
  }
  console.log(stockInfoApi);


  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          库存信息
        </Typography>
        <Typography variant="subtitle2">
          查看并编辑所有的库存信息
        </Typography>
      </Grid>

      <Grid item>


        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>库存信息</DialogTitle>
          <DialogContent>

            <TextField

              autoFocus
              margin="dense"
              id="id"
              label="采购编号"
              fullWidth
              variant="standard"
              onChange={handleIdChange}
              helperText="请输入合法数字"
              error={judgeID}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="原料名称"
              fullWidth
              variant="standard"
              onChange={handleNameChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="原料采购量"
              fullWidth
              variant="standard"
              onChange={handleAmountChange}
              helperText="请输入合法数字"
              error={judgeAmount}
            />
            <Box
              sx={{
                marginTop: '20px'
              }}
            >
              <DesktopDatePicker
                autoFocus
                label="日期"
                inputFormat="yyyy-MM-dd"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>退出</Button>
            <Button onClick={() => {
              const conduct = async () => {
                console.log("n!")
                console.log(n);
                return await stockInfoApi.addStock(
                  {
                    amount: n.amount,
                    date: n.date,
                    ing_name: n.ing_name,
                    record_id: n.record_id,
                    surplus: n.surplus
                  } as StockInfo);
              }

              var rex = /^[0-9]+$/;//正则表达式
              var flag = (rex.test(n.amount.toString()) && rex.test(n.record_id.toString()));//通过表达式进行匹配

              if (flag) {
                conduct().then((value) => {
                  alert("增加成功：" + value);
                  window.location.reload();

                }).catch((value) => {

                  alert("增加失败：" + value);
                });
              } else {
                alert("数据类型不合法");
              }

            }} >确定</Button>
          </DialogActions>
        </Dialog>
      </Grid>



    </Grid>
  );

}

export default StockPageHeader;
