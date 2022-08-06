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
import {Divider, useTheme} from '@mui/material';

import { CryptoVip,CryptoVipStatus } from '@/models/crypto_vip';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Select,MenuItem,InputLabel} from '@mui/material';
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
  FormControl,
} from '@mui/material';
import { FC, ChangeEvent, useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { queryVipApi } from '@/queries/query_vip';
import { Refresh } from '@mui/icons-material';

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

const statusOptions = [
  {
    id: '未定义',
    name: '未定义'
  },
  {
    id: '男',
    name: '男'
  },
  {
    id: '女',
    name: '女'
  }
];

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

export default function ModifyDialog(props: VipProps) {
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

    setValue_optimized_vip(props.info);
  };

  const theme = useTheme();

  const { t }: { t: any } = useTranslation();

  const [optimized_vip, setValue_optimized_vip] = useState<CryptoVip>(null);

  const handleSetGender = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setValue_optimized_vip((pre)=>{
      pre.gender=value;
      return pre;
    })
  };

  const handleSetBirthday=(value:string)=>
  {

    if (value == null) {
      return;
    }

    setValue_optimized_vip((pre)=>{
      pre.birthday=value;
      return pre;
    })
  };

  const handleBalanceInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setValue_optimized_vip((pre)=>{
      pre.balance=value;
      return pre;
    })
  };

  const handleCreditInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== null) {
      value = e.target.value;
    }

    setValue_optimized_vip((pre)=>{
      pre.credit=value;
      return pre;
    })
  };

  const handleSubmitEdit = async() =>
  {
      console.log("edit confirm");
        //  检查数据

      try {
        let res= await queryVipApi.editVip(optimized_vip)
        console.log(res);
        setOpenSuccessDialog(true);
      } 
      catch (err) {
        console.error(err);
        setOpenErrorDialog(true);
      }
  }

  if(!optimized_vip)
  {
    setValue_optimized_vip(props.info);
    console.log(optimized_vip);
    return;
  }
  

  return (
    <div>
        <IconButton
            sx={{
                '&:hover': {
                    background: theme.colors.primary.lighter
                          },
                    color: theme.palette.primary.main
                }}
            color="inherit"
            size="small"
            onClick={handleClickOpen}
                >
            <EditTwoToneIcon fontSize="small" />
        </IconButton>



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
            {t(props.info.user_name)}
          </Typography>
          <Typography variant="subtitle2">
            {t('修改该会员信息')}
          </Typography>
          <Divider/>
          
        </DialogTitle>
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 2, width: '30ch' },
               }}
            noValidate
            autoComplete="off"
           >           
            <FormControl sx={{ m: 2, width: '30ch' }}>
            <InputLabel>性别</InputLabel>
            <Select
              defaultValue={optimized_vip.gender}
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
            
          </Box>  
          <Box
          component="form"
          sx={{
          '& .MuiTextField-root': { m: 2, width: '30ch' },
             }}
          noValidate
          autoComplete="off">
          

              <DatePicker
                value={optimized_vip.birthday}
                onChange={(newValue) => {
                  setValue_optimized_vip((pre)=>{
                    pre.birthday=newValue;
                    return pre;
                  });
                }}
                label="出生日期"
                renderInput={(params) => (
                  <TextField
                    value={optimized_vip.birthday}
                    fullWidth
                    placeholder={t('出生日期')}
                    {...params}
                  />
                )}
              />
          </Box>

          <Box
          component="form"
          sx={{
          '& .MuiTextField-root': { m: 2, width: '30ch' },
             }}
          noValidate
          autoComplete="off">
          

          {
              optimized_vip.balance>=0?
            <TextField
             required
             fullWidth
              id="outlined-required"
              label="余额"
              type="number"
             defaultValue={optimized_vip.balance.toString()}
             onChange={handleBalanceInputChange}         
             /> 
             :
             <TextField
             required
             fullWidth
              id="outlined-required"
              label="余额"
              type="number"
             defaultValue={optimized_vip.balance.toString()}  
             onChange={handleBalanceInputChange}
             error
             helperText="非法余额"         
             /> 
            }
          </Box>

          <Box
          component="form"
          sx={{
          '& .MuiTextField-root': { m: 2, width: '30ch' },
             }}
          noValidate
          autoComplete="off">
          

          {
              optimized_vip.credit>=0?
            <TextField
             required
             fullWidth
              id="outlined-required"
              label="积分"
              type="number"
             defaultValue={optimized_vip.credit.toString()}  
             onChange={handleCreditInputChange}         
             /> 
             :
             <TextField
             required
             fullWidth
              id="outlined-required"
              label="积分"
              type="number"
             defaultValue={optimized_vip.credit.toString()}  
             onChange={handleCreditInputChange}
             error
             helperText="非法积分"         
             /> 
            }
          </Box>

          <Button
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleSubmitEdit}
          >
          确认修改
        </Button>     
      </BootstrapDialog>  

                  <Dialog
                    open={openSuccessDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"修改成功"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        该会员信息已修改
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
                      {"修改错误"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        修改失败
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


      {/*  
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          会员：{props.info.user_name}
        </BootstrapDialogTitle>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
          <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 5, width: '30ch' },
               }}
            noValidate
            autoComplete="off"
           >
           <TextField
             required
              id="outlined-required"
              label="姓名"
             defaultValue={props.info.user_name}             
             />
           <TextField
             required
              id="outlined-required"
              label="积分"
             defaultValue={props.info.credit}
             />
           <TextField
             required
             select
              id="outlined-required"
              label="状态"
             defaultValue={props.info.credit}
                     value={props.info.status}
                   >
                    {statusOptions.map((statusOption) => (
                       <MenuItem key={statusOption.id} value={statusOption.id}>
                          {statusOption.name}
                      </MenuItem>
                    ))}
            </TextField>  
          </Box>
        </Grid>         
      </BootstrapDialog>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('新增会员')}
          </Typography>
          <Typography variant="subtitle2">
            {t('填写会员所必须的信息')}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            title: '',
            desc: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .max(255)
              .required(t('必须会员名称')),
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              //handleCreatePromotionSuccess(_values.title, _values.desc);
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box pb={1}>
                      <b>{t('姓名')}:</b>
                    </Box>
                    <TextField
                      error={Boolean(touched.title && errors.title)}
                      fullWidth
                      helperText={touched.title && errors.title}
                      name="title"
                      placeholder={t('要创建会员的姓名')}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box pb={1}>
                      <b>{t('生日')}:</b>
                    </Box>
                    <DatePicker
                      value={value_birthday}
                      onChange={(newValue) => {
                        setValue_birthday(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          //value={value}
                          fullWidth
                          placeholder={t('选择日期')}
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              
              
            </form>
          )}
        </Formik>
      </Dialog>*/} 