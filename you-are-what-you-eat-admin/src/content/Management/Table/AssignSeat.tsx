import * as React from 'react';
import { FC, ChangeEvent, useState } from 'react';
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
import {useTheme} from '@mui/material';

import { CryptoTable } from '@/models/crypto_table';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { queryTableApi } from '@/queries/query_table';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface DialogIDProps{
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
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function AssignSeat() {
  const [open, setOpen] = React.useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const [openQueueDialog, setOpenQueueDialog] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [inputNum, setInputNum] = useState<number>(1);
  const [queueNum, setQueueNum] = useState<string>('1');
  const [assignNum, setAssignNum] = useState<string>('1');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenSuccessDialog(false);
    setOpenQueueDialog(false);
    setOpenErrorDialog(false);
  };
  const handleSuccessClose = () => {
    setOpen(false);
    setOpenSuccessDialog(false);
    setOpenQueueDialog(false);
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

  const handleAssignConfirm = async() =>
  {

    console.log("assign confirm");

      //数据检验
      
      try {
        let res= await queryTableApi.getQueueTable(inputNum);
        console.log(res);

        if(res.has_table)
        {
          setAssignNum(res.table_id);
          setOpenSuccessDialog(true);
        }
        else
        {
          setQueueNum(res.queue_id);
          setOpenQueueDialog(true);
        }
        
      } 
      catch (err) {
        console.error(err);
        setOpenErrorDialog(true);
      }

  }

  const theme = useTheme();

  return (
    <div>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          安排座位
        </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        安排座位
        </BootstrapDialogTitle>
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 2, width: '30ch' },
               }}
            noValidate
            autoComplete="off"
           >
            {
              inputNum>0?
            <TextField
             required
             fullWidth
              id="outlined-required"
              label="人数"
              type="number"
             defaultValue='1'  
             onChange={handleInputChange}         
             /> 
             :
             <TextField
             required
             fullWidth
              id="outlined-required"
              label="人数"
              type="number"
             defaultValue='1'  
             onChange={handleInputChange}
             error
             helperText="非法人数"         
             /> 
            }
                                   
          </Box>
          {inputNum>0?  
          <Button
          startIcon={<AddTwoToneIcon fontSize="small" />} 
          onClick={handleAssignConfirm}         
          >
          确认安排
        </Button>
        :
        <Button
        startIcon={<AddTwoToneIcon fontSize="small" />}
        disabled          
        >
        确认安排
      </Button> 
        
      }   
      </BootstrapDialog>

                  <Dialog
                    open={openSuccessDialog}
                    onClose={handleSuccessClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                    fullWidth
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"安排成功"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText variant="h1">
                        该顾客的桌号为: {assignNum}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Dialog
                    open={openQueueDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                    fullWidth
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"排队成功"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText variant="h1">
                        该顾客的排号为: {queueNum}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>
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
                    <DialogTitle id="alert-dialog-title">
                      {"错误"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        请求安排失败
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
