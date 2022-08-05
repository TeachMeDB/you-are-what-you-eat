import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import { CryptoVip,CryptoVipStatus } from '@/models/crypto_vip';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import { useTranslation } from 'react-i18next';
import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

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

export interface VipProps{
  info:CryptoVip
}

type GenderType = '男' | '女';

const statusOptions = [
  {
    id: '男',
    name: '男'
  },
  {
    id: '女',
    name: '女'
  }
];

interface GenderFilter{
  gender:GenderType;
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

export default function SignUpVip() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const { t }: { t: any } = useTranslation();

  const [value_user_name, setValue_user_name] = useState<string | null>(null);
  const [value_birthday, setValue_birthday] = useState<Date | null>(null);
  const [value_gender, setValue_gender] = useState<GenderType>(null);
  const handleSetUserName = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setValue_user_name(value);
  };
  const handleSetGender = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setValue_gender(value);
  };
  const handleSubmitSignUp=()=>{
    console.log(value_user_name);
    console.log(value_birthday);
    console.log(value_gender);
  }

  return (
    <div>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          会员注册
        </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          会员注册
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
             value={value_user_name}
             onChange={handleSetUserName}             
             />
            <FormControl sx={{ m: 2, width: '30ch' }}>
            <InputLabel>性别</InputLabel>
            <Select
              value={value_gender}
              onChange={handleSetGender}
              id="outlined-required"
              label="性别"
              fullWidth
              required

            >
              {statusOptions.map((statusOption) => (
                <MenuItem key={statusOption.id} value={statusOption.id}>
                  {statusOption.name}
                </MenuItem>
              ))}
            </Select> 
            </FormControl>

                   <DatePicker
                      value={value_birthday}
                      onChange={(newValue) => {
                        setValue_birthday(newValue);
                      }}
                      label="出生日期"
                      renderInput={(params) => (
                        <TextField
                          //value={value}
                          fullWidth
                          placeholder={t('出生日期')}
                          {...params}
                        />
                      )}
                    />
          </Box>  
          <Button
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleSubmitSignUp}
          >
          确认注册
        </Button>     
      </BootstrapDialog>
    </div>
  );
}
