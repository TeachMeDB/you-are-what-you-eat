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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Divider, useTheme } from '@mui/material';

import { CryptoVip, CryptoVipStatus,CryptoCreateVip } from '@/models/crypto_vip';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { wait } from 'src/utils/wait';
import DatePicker from '@mui/lab/DatePicker';
import {
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Tooltip,
  lighten,
  useMediaQuery,
  TableFooter,
  FormControl
} from '@mui/material';
import { FC, ChangeEvent, useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { queryVipApi } from '@/queries/query_vip';
import { Refresh } from '@mui/icons-material';

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

export interface VipProps {
  info: CryptoVip;
}

type GenderType = '男' | '女'| '未定义';

const statusOptions = [
  {
    id: '男',
    name: '男'
  },
  {
    id: '女',
    name: '女'
  },
  {
    id: '未定义',
    name: '未定义'
  }
];

interface GenderFilter {
  gender: GenderType;
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

export default function SignUpVip() {
  const [open, setOpen] = React.useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);

    resetOptimization();

  };
  const handleSuccessClose = () => {
    setOpen(false);
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);

    window.location.reload();
  };

  const theme = useTheme();
  const { t }: { t: any } = useTranslation();

  //const [optimized_vip, setValue_optimized_vip] = useState<CryptoCreateVip>(null);
  const [user_name, setUserName] = useState<string>(null);
  const [birthday, setBirthday] = useState<string>(null);
  const [gender, setGender] = useState<string>(null);

  const handleSetUserName = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setUserName(value);
  };

  const handleSetGender = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setGender(value);
  };

  const handleSetBirthday = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setBirthday(value);
  };

  const handleSubmitEdit = async () => {
    console.log('edit confirm');
    //  检查数据

    let submit: CryptoCreateVip = {
      user_name: user_name,
      gender: gender,
      birthday: birthday,
    };

    try {
      let res = await queryVipApi.createVip(submit);
      console.log(res);
      setOpenSuccessDialog(true);
      //window.location.reload();
    } catch (err) {
      console.error(err);
      setOpenErrorDialog(true);
    }
  };

  const resetOptimization = () => {
    setUserName(null);
    setBirthday(null);
    setGender(null);
  };

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
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {"创建会员"}
          </Typography>
          <Divider />
        </DialogTitle>
        
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
              required
              fullWidth
              id="outlined-required"
              label="姓名"
              onChange={handleSetUserName}
            />

          <FormControl sx={{ m: 2, width: '30ch' }}>
            <DialogContentText>
              输入会员名称
            </DialogContentText>
          </FormControl>
        </Box>
        
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl sx={{ m: 2, width: '30ch' }}>
            <InputLabel>性别</InputLabel>
            <Select
              defaultValue={gender}
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

          <FormControl sx={{ m: 2, width: '30ch' }}>
            <DialogContentText>
              会员性别，可以设置为“男”、“女”或“未定义”
            </DialogContentText>
          </FormControl>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <DatePicker
            value={birthday}
            onChange={(newValue) => {
              setBirthday(newValue);
            }}
            label="出生日期"
            renderInput={(params) => (
              <TextField
                value={birthday}
                fullWidth
                placeholder={t('出生日期')}
                {...params}
              />
            )}
          />

          <FormControl sx={{ m: 2, width: '30ch' }}>
            <DialogContentText>
              设定该会员生日
            </DialogContentText>
          </FormControl>
        </Box>

        

        

        {user_name&&birthday&&gender ? (
          <Button
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => {
              handleSubmitEdit();
              window.location.reload();
            }}
          >
            确认创建
          </Button>
        ) : (
          <Button
            startIcon={<AddTwoToneIcon fontSize="small" />}
            //onClick={handleSubmitEdit}
            disabled
          >
            请检查数据
          </Button>
        )}
      </BootstrapDialog>
      
      <Dialog
        open={openSuccessDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'修改成功'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            会员已创建
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
        <DialogTitle id="alert-dialog-title">{'修改错误'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            创建失败
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
<BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('注册会员')}
          </Typography>
          <Typography variant="subtitle2">
            {t('该自定义注册会员方式已过时，请使用首页Casdoor注册')}
          </Typography>
          <Divider />
        </DialogTitle>
        {<Box
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
          </Box>}
        <Button
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClose}
        >
          好的
        </Button>
      </BootstrapDialog>

*/
