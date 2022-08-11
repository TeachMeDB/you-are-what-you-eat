import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useTheme } from '@mui/material';

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import Footer from '@/components/Footer';
import CardActions from '@mui/material/CardActions';

import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { CryptoTable } from '@/models/crypto_table';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FC, ChangeEvent, useState } from 'react';
import { queryTableApi } from '@/queries/query_table';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface DialogIDProps {
  id: string;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface IndiTableProps {
  table_id: number;
  customer_number: number;
  table_capacity: number;
  occupied: string;
}

export default function IndividualTable(props: IndiTableProps) {
  /*const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();*/
  const [open, setOpen] = React.useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [inputNum, setInputNum] = useState<number>(1);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);
  };
  const handleSuccessClose = () => {
    setOpen(false);
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);

    window.location.reload();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setInputNum(parseInt(value));
  };

  const handleAssignConfirm = async () => {
    console.log('assign confirm');

    let confirmData: CryptoTable = {
      table_id: props.table_id,
      customer_number: inputNum,
      table_capacity: props.table_capacity,
      occupied: '是'
    };

    try {
      let res = await queryTableApi.setTable(confirmData);
      console.log(res);
      setOpenSuccessDialog(true);
    } catch (err) {
      console.error(err);
      setOpenErrorDialog(true);
    }

    /*fetch('http://106.14.212.200:8000/app/api/Table/PostTableStatus',{
      method:'post',
      body:JSON.stringify(confirmData),
      headers:
      {
        'Content-Type':'application/json'
      }
    }).then((res)=>
    {
      console.log(res);
      if(res.ok)
      {
        //ok
        setOpenSuccessDialog(true);
      }
      else
      {
        //not ok
        setOpenErrorDialog(true);
      }
    })*/

    //console.log(confirmData);
  };

  const theme = useTheme();

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {'餐桌' + props.table_id.toString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.table_capacity.toString() + '人座'}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            {props.occupied}
          </Typography>
        </CardContent>
        <CardActions>
          {props.occupied == '空闲' ? (
            <Button size="small" onClick={handleClickOpen}>
              安排
            </Button>
          ) : (
            <Button
              size="small"
              color="error"
              //disabled
              //onClick={handleClickOpen}
            >
              {'已有' + props.customer_number + '人使用'}
            </Button>
          )}
        </CardActions>
      </Card>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          安排座位: {props.table_id}
        </BootstrapDialogTitle>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          {inputNum > 0 ? (
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="人数"
              type="number"
              defaultValue="1"
              onChange={handleInputChange}
            />
          ) : (
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="人数"
              type="number"
              defaultValue="1"
              onChange={handleInputChange}
              error
              helperText="非法人数"
            />
          )}
        </Box>
        {inputNum > 0 ? (
          <Button
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleAssignConfirm}
          >
            确认安排
          </Button>
        ) : (
          <Button startIcon={<AddTwoToneIcon fontSize="small" />} disabled>
            确认安排
          </Button>
        )}
      </BootstrapDialog>

      <Dialog
        open={openSuccessDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'安排成功'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            安排该顾客至座位: {props.table_id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openErrorDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'安排错误'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            安排失败
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/* 
  <div>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={handleClickOpen}
        >
          桌子
        </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          桌子
        </BootstrapDialogTitle>
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 2, width: '30ch' },
               }}
            noValidate
            autoComplete="off"
           >
           <TextField
             required
             fullWidth
              id="outlined-required"
              label="姓名"
             defaultValue=''             
             />            
           <TextField
             required
             fullWidth
              id="outlined-required"
              label="出生日期"
             defaultValue=''
             />
           <TextField
             required
             fullWidth
              id="outlined-required"
              label="性别"
             defaultValue=''
             />
          </Box>  
          <Button
          startIcon={<AddTwoToneIcon fontSize="small" />}
          >
          确认注册
        </Button>     
      </BootstrapDialog>
    </div>*/
