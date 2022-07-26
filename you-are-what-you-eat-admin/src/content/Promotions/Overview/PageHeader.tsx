import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { wait } from 'src/utils/wait';
import numeral from 'numeral';

import {
  styled,
  Grid,
  Dialog,
  DialogTitle,
  Chip,
  DialogContent,
  Box,
  Zoom,
  Typography,
  TextField,
  CircularProgress,
  Avatar,
  Autocomplete,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Tooltip,
  IconButton,
  lighten,
  useTheme,
  useMediaQuery,
  TableFooter
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import { useSnackbar } from 'notistack';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  currency: string;
}

function PageHeader() {
  const { t }: { t: any } = useTranslation();
  const [open, setOpen] = useState(false);
  // const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const itemsList: Item[] = [
    {
      id: 1,
      name: 'Design services for March',
      quantity: 1,
      price: 8945,
      currency: '$'
    },
    {
      id: 2,
      name: 'Website migration services',
      quantity: 3,
      price: 2367,
      currency: '$'
    }
  ];

  const members = [
    {
      avatar: '/static/images/avatars/1.jpg',
      name: 'Maren Lipshutz'
    },
    {
      avatar: '/static/images/avatars/2.jpg',
      name: 'Zain Vetrovs'
    },
    {
      avatar: '/static/images/avatars/3.jpg',
      name: 'Hanna Siphron'
    },
    {
      avatar: '/static/images/avatars/4.jpg',
      name: 'Cristofer Aminoff'
    },
    {
      avatar: '/static/images/avatars/5.jpg',
      name: 'Maria Calzoni'
    }
  ];

  const [value, setValue] = useState<Date | null>(null);
  const [value1, setValue1] = useState<Date | null>(null);

  const [items] = useState<Item[]>(itemsList);

  const handleCreatePromotionOpen = () => {
    setOpen(true);
  };

  const handleCreateInvoiceClose = () => {
    setOpen(false);
  };

  const handleCreatePromotionSuccess = () => {
    // enqueueSnackbar(t('A new invoice has been created successfully'), {
    //   variant: 'success',
    //   anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'right'
    //   },
    //   TransitionComponent: Zoom
    // });

    setOpen(false);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('促销活动')}
          </Typography>
          <Typography variant="subtitle2">
            {t('全部促销活动')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            onClick={handleCreatePromotionOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t('新增活动')}
          </Button>
        </Grid>
      </Grid>




      {/*创建促销弹窗 */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCreateInvoiceClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('创建活动')}
          </Typography>
          <Typography variant="subtitle2">
            {t('填写有关信息，创建促销活动')}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            number: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            number: Yup.string()
              .max(255)
              .required(t('活动名是必填的'))
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
              handleCreatePromotionSuccess();
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
                      <b>{t('活动名')}:</b>
                    </Box>
                    <TextField
                      error={Boolean(touched.number && errors.number)}
                      fullWidth
                      helperText={touched.number && errors.number}
                      name="number"
                      placeholder={t('在此处填写活动名称')}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.number}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box pb={1}>
                      <b>{t('活动描述')}:</b>
                    </Box>
                    <Autocomplete
                      multiple
                      sx={{
                        m: 0
                      }}
                      limitTags={2}
                      // @ts-ignore
                      getOptionLabel={(option) => option.title}
                      options={members}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <Avatar
                            sx={{
                              mr: 1
                            }}
                            src={option.avatar}
                          />
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true
                          }}
                          placeholder={t('在此处描述活动信息')}
                        />
                      )}
                      renderTags={(members, getTagProps) =>
                        members.map((ev, index: number) => (
                          <Chip
                            key={ev.name}
                            label={ev.name}
                            {...getTagProps({ index })}
                            avatar={<Avatar src={ev.avatar} />}
                          />
                        ))
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box pb={1}>
                      <b>{t('开始时间')}:</b>
                    </Box>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          placeholder={t('Select date...')}
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box pb={1}>
                      <b>{t('结束时间')}:</b>
                    </Box>
                    <DatePicker
                      value={value1}
                      onChange={(newValue1) => {
                        setValue1(newValue1);
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          placeholder={t('Select date...')}
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('菜品')}</TableCell>
                      <TableCell>{t('折扣')}</TableCell>
                      <TableCell>{t('原价')}</TableCell>
                      <TableCell>{t('折后价')}</TableCell>
                      <TableCell align="right">{t('操作')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item: Item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Typography noWrap>{item.name}</Typography>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {numeral(item.price).format(`${item.currency}0,0.00`)}
                        </TableCell>
                        <TableCell>
                          {numeral(item.price).format(`${item.currency}0,0.00`)}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip arrow title={t('Delete')}>
                            <IconButtonError>
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButtonError>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={0}>
                        <Button
                          startIcon={<AddTwoToneIcon />}
                          variant="outlined"
                        >
                          {t('Add item')}
                        </Button>
                      </TableCell>
                      <TableCell colSpan={4} align="right">
                        <Typography
                          gutterBottom
                          variant="caption"
                          color="text.secondary"
                          fontWeight="bold"
                        >
                          {t('Total')}:
                        </Typography>
                        <Typography variant="h3" fontWeight="bold">
                          {numeral(9458).format(`$0,0.00`)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
              <Box px={3} pt={3}>
                <TextField
                  label={t('Additional informations')}
                  multiline
                  placeholder={t(
                    'Write here any additional informations you might have...'
                  )}
                  fullWidth
                  minRows={3}
                  maxRows={8}
                />
              </Box>
              <Box
                sx={{
                  display: { xs: 'block', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3
                }}
              >
                <Box>
                  <Button fullWidth={mobile} variant="outlined">
                    {t('Preview invoice')}
                  </Button>
                </Box>
                <Box>
                  <Button
                    fullWidth={mobile}
                    sx={{
                      mr: { xs: 0, sm: 2 },
                      my: { xs: 2, sm: 0 }
                    }}
                    color="secondary"
                    variant="outlined"
                    onClick={handleCreateInvoiceClose}
                  >
                    {t('Save as draft')}
                  </Button>
                  <Button
                    fullWidth={mobile}
                    type="submit"
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={Boolean(errors.submit) || isSubmitting}
                    variant="contained"
                    size="large"
                  >
                    {t('Create invoice')}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default PageHeader;
