import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { StockInfo } from '@/models/stock_info';

import { stockInfoApi } from '@/queries/stock';

let n: StockInfo = {
    "amount": 0,
    "date": "",
    "ing_name": "",
    "record_id": "",
    "surplus": 0
}

function PageHeader() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log(n);
    };

    const handleAmountChange = (e) => {
        n.amount = parseInt(e.target.value);
        n.surplus = n.amount;
    }
    const handleDateChange = (e) => {
        n.date = e.target.value;
    }
    const handleNameChange = (e) => {
        n.ing_name = e.target.value;
    }
    const handleIdChange = (e) => {
        n.record_id = e.target.value;
    }


    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    库存
                </Typography>
                <Typography variant="subtitle2">
                    查看并编辑所有的库存信息
                </Typography>
            </Grid>

            <Grid item>

                <Button
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                    onClick={handleClickOpen}
                >
                    新增库存信息
                </Button>
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
                            label="日期"
                            fullWidth
                            variant="standard"
                            onChange={handleDateChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="原料采购量"
                            fullWidth
                            variant="standard"
                            onChange={handleAmountChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>退出</Button>
                        <Button onClick={() => {
                            const conduct = async () => {

                                return stockInfoApi.postStock(
                                    {
                                        amount: n.amount,
                                        date: n.date,
                                        ing_name: n.ing_name,
                                        record_id: n.record_id,
                                        surplus: n.surplus
                                    } as StockInfo);

                            }

                            conduct().then((value) => {

                                alert("成功：" + value);

                                window.location.reload();


                            }).catch((value) => {

                                alert("失败：" + value);
                            });

                        }} href="javascript:location.reload(true)">确定</Button>
                    </DialogActions>
                </Dialog>
            </Grid>



        </Grid>
    );
}

export default PageHeader;
