import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';






import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { MealInfo } from '@/models/meal_info';


import { mealInfoApi } from '@/queries/meal';


let m: MealInfo = {
    id: '123',
    dis_name: '123',
    price: 123,
    description: '123',
    tags: [""]
}



function PageHeader() {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleVerified = () => {
        mealInfoApi.postMeal(m);
        setOpen(false);
    };
    const idInputChange = (e) => {

        m.id = e.target.value;
    }
    const nameInputChange = (e) => {
        m.dis_name = e.target.value;
    }
    const priceInputChange = (e) => {
        m.price = Number(e.target.value);
    }
    const descriptionInputChange = (e) => {
        m.description = e.target.value;
    }
    const tagsInputChange = (e) => {
        m.tags = e.target.value.split(" ");
        console.log(m.tags);
    }

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    菜品信息
                </Typography>
                <Typography variant="subtitle2">
                    查看并编辑所有菜品信息
                </Typography>
            </Grid>

            <Grid item>

                <Button
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                    onClick={handleClickOpen}
                >
                    新增菜品
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>菜品信息</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="id"
                            label="菜品编号"
                            fullWidth
                            variant="standard"
                            onChange={idInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="菜品名称"
                            fullWidth
                            variant="standard"
                            onChange={nameInputChange}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="菜品价格"
                            fullWidth
                            variant="standard"
                            onChange={priceInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="菜品描述"
                            fullWidth
                            variant="standard"
                            onChange={descriptionInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="标签"
                            fullWidth
                            variant="standard"
                            onChange={tagsInputChange}
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
