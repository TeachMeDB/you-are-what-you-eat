import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { wait } from 'src/utils/wait';
import SelectDishTable from 'src/content/Promotions/Overview/SelectDishTable'
import { useRefMounted } from 'src/hooks/useRefMounted';

import {
  styled,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  CircularProgress,
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
  TableFooter,
  MenuItem
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { SelectableDish, SelectedDish } from '@/models/promotion';
import { promotionsApi } from '@/queries/promotions';

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

function PageHeader() {
  const isMountedRef = useRefMounted();
  const { t }: { t: any } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectDishDialogOpen, setSelectDishDialogOpen] = useState(false);
  const [selectableDishes, setSelectableDishes] = useState<SelectableDish[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);

  const getSelectableDishes = useCallback(async() => {
    try {
      const response = await promotionsApi.getSelectableDishes();
      if (isMountedRef())
        setSelectableDishes(response)
    } catch(err) {
      console.log(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    getSelectableDishes()
  }, [getSelectableDishes]);

  // const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState<Date | null>(null);
  const [value1, setValue1] = useState<Date | null>(null);

  const handleCreatePromotionOpen = () => {
    setOpen(true);
  };

  const handleCreatePromotionClose = () => {
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
        onClose={handleCreatePromotionClose}
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
              .required(t('此项是必填的'))
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
                    <TextField
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true
                          }}
                          placeholder={t('在此处描述活动信息')}
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
                          placeholder={t('选择日期')}
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
                    {selectedDishes.map((dish) => (
                      <TableRow key={dish.name}>
                        <TableCell>
                          <Typography noWrap>{dish.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <TextField
                          id="outlined-select-currency"
                          select
                          label="折扣"
                          value={`${dish.discount * 10}`}
                          onChange={(e) => {
                            var changeIdx = selectedDishes.findIndex((d) => d.name === dish.name);
                            var newDishes = [...selectedDishes];
                            newDishes[changeIdx].discount = Number(e.target.value) / 10;
                            setSelectedDishes(newDishes);
                          }}
                          helperText="在此处选择菜品的折扣幅度"
                        >
                          {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((disc) => (
                            <MenuItem key={disc} value={disc}>
                              {disc}
                            </MenuItem>
                          ))}
                        </TextField>
                        </TableCell>
                        <TableCell>
                          ￥{dish.price}
                        </TableCell>
                        <TableCell>
                          ￥{(dish.price * dish.discount).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip arrow title={t('Delete')}>
                            <IconButtonError
                              onClick={() => {
                                setSelectedDishes(
                                  selectedDishes.filter((d) => d.name !== dish.name)
                                )
                              }}
                            >
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
                          onClick={() => setSelectDishDialogOpen(true)}
                        >
                          {t('添加菜品')}
                        </Button>
                      </TableCell>
                      <TableCell colSpan={4} align="right">
                        <Typography
                          gutterBottom
                          variant="caption"
                          color="text.secondary"
                          fontWeight="bold"
                        >
                          {t('合计')}:
                        </Typography>
                        <Typography variant="h3" fontWeight="bold">
                          {selectedDishes.length}种菜品
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: { xs: 'block', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3
                }}
              >
                <Box>
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
                    onClick={handleCreatePromotionClose}
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



      <Dialog
        fullWidth
        maxWidth="md"
        open={selectDishDialogOpen}
        onClose={() => setSelectDishDialogOpen(false)}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('选择菜品')}
          </Typography>
          <Typography variant="subtitle2">
            {t('选择参与促销活动的菜品')}
          </Typography>
        </DialogTitle>
          {
            <>
              <Box
                sx={{p:1}}
              >
                <SelectDishTable 
                  selectableDishes={selectableDishes} 
                  parentSelectedDishes={selectedDishes}
                  setParentSelectedDishes={setSelectedDishes}
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
                  <Button
                    fullWidth={mobile}
                    type="submit"
                    variant="contained"
                    size="large"
                    onClick={() => setSelectDishDialogOpen(false)}
                  >
                    {t('确认选择')}
                  </Button>
                </Box>
              </Box>
              </>
          }
      </Dialog>
    </>
  );
}

export default PageHeader;
