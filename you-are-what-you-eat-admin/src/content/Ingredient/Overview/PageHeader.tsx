import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { queryIngredientApi } from '@/queries/query_ingredient';
import { queryIngredientRecordApi } from '@/queries/query_ingredient_record';
import { format } from 'date-fns';
import { DesktopDatePicker } from '@mui/lab';

function PageHeader(props) {
  const {
    employees = [], ingredients = [], currentTab = 1,
    setIngredientInfoes, setIngredientRecordInfoes,
  } = props;
  const [open, setOpen] = React.useState(false);
  const defaultFormValue = { ingr_id: '', ingr_name: '', ingr_type: '', ingr_description: '' };
  const defaultFormErrors = { ingr_id: '', ingr_name: '', ingr_type: '', ingr_description: '' };
  const [formValue, setFormValue] = useState(defaultFormValue);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);
  const defaultIngredientRecordValue = {
    record_id: '',
    ingr_id: 0,
    purchases: '0',
    record_type: '采购',
    purchasing_date: null,
    measure_unit: '',
    shelf_life: '0',
    produced_date: null,
    price: '0',
    director_id: 0,
  };
  const defaultIngredientRecordErrors = {
    record_id: '',
    ingr_id: '',
    purchases: '',
    record_type: '',
    purchasing_date: '',
    measure_unit: '',
    shelf_life: '',
    produced_date: '',
    price: '',
    director_id: '',
  };
  const [ingredientRecordFormValue, setIngredientRecordFormValue] = useState(defaultIngredientRecordValue);
  const [ingredientRecordFormErros, setIngredientRecordFormErros] = useState(defaultIngredientRecordErrors);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const { ingr_id = '', ingr_name = '', ingr_type = '', ingr_description = '' } = formValue;
    setFormErrors({
      'ingr_id': ingr_id === '' ? '耗材编号不能为空' : '',
      'ingr_name': ingr_name === '' ? '耗材名称不能为空' : '',
      'ingr_type': ingr_type === '' ? '耗材类型不能为空' : '',
      'ingr_description': ingr_description === '' ? '耗材描述不能为空' : '',
    });
    if (ingr_id === '' || ingr_name === '' || ingr_type === '' || ingr_description === '') {
      return;
    }
    const resp = await queryIngredientApi.addIngredient(formValue);
    if (!resp.ok) {
      alert('提交失败，请检查后重试');
      return;
    }
    const data = await queryIngredientApi.getIngredientList('');
    setIngredientInfoes(data);
    setOpen(false);
    setFormValue(defaultFormValue);
  };
  const handleSubmitIngredientRecordForm = async () => {
    const {
      record_id,
      ingr_id,
      purchases,
      record_type,
      purchasing_date,
      measure_unit,
      shelf_life = '',
      produced_date,
      price = '',
      director_id,
    } = ingredientRecordFormValue;
    const priceValue = parseFloat(price);
    const shelfLifeValue = parseFloat(shelf_life);
    const purchasesValue = parseFloat(purchases);
    setIngredientRecordFormErros({
      record_id: !record_id ? '记录编号不能为空' : '',
      ingr_id: !ingr_id ? '请选择耗材' : '',
      purchases: purchases == '0' || !purchases ? '数量不能为空' : (purchasesValue < 0 ? '数量不能小于0' : ''),
      record_type: !record_type ? '记录类型不能为空' : '',
      purchasing_date: !purchasing_date ? '修改日期不能为空' : '',
      measure_unit: !measure_unit ? '单位不能为空' : '',
      shelf_life: shelf_life == '0' || !shelf_life ? '保质期不能为0' : (shelfLifeValue < 0 ? '保质期不能小于0' : ''),
      produced_date: !produced_date ? '生产日期不能为空' : '',
      price: (record_type === '采购' && (price == '0' || !price)) ? '价格不能为0' : (priceValue < 0 ? '价格不能小于0' : ''),
      director_id: !director_id ? '请选择管理员' : '',
    });
    if (!record_id || !ingr_id || !purchases || purchases == '0' || purchasesValue < 0
      || !record_type || !purchasing_date || !measure_unit || !produced_date
      || !shelf_life || shelf_life == '0' || shelfLifeValue < 0
      || (record_type === '采购' && (price == '0' || !price)) || priceValue < 0
      || !director_id) {
      return;
    }

    const resp = await queryIngredientRecordApi.addIngredientRecord({
      ...ingredientRecordFormValue,
      purchases: record_type === '采购' ? `${purchases}` : '0',
      surplus: record_type === '采购' ? '0' : `-${purchases}`,
      purchasing_date: format(purchasing_date, 'yyyy-MM-dd'),
      produced_date: format(produced_date, 'yyyy-MM-dd'),
      price: parseFloat(price),
      shelf_life: parseFloat(shelf_life),
    });
    if (!resp.ok) {
      alert('提交失败，请检查后重试');
      return;
    }
    const data = await queryIngredientRecordApi.getIngredientRecordList();
    setIngredientRecordInfoes(data);
    setOpen(false);
    setIngredientRecordFormValue(defaultIngredientRecordValue);
  };

  const handleFormChange = (field, e) => {
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  const handleIngredientRecordFormChange = (field, e) => {
    setIngredientRecordFormValue({
      ...ingredientRecordFormValue,
      [field]: e.target.value,
    });
  };

  const handleIngredientRecordFormDateChange = (field, e) => {
    setIngredientRecordFormValue({ ...ingredientRecordFormValue, [field]: e });
  };

  const tabs = [
    { value: 1, label: '耗材', description: '查看并编辑所有耗材信息', addText: '新增耗材' },
    { value: 2, label: '耗材管理记录', description: '查看并编辑所有耗材管理记录', addText: '新增耗材管理记录' },
  ];

  const recordTypes = [
    { label: '采购', value: '采购' },
    { label: '消耗', value: '消耗' },
  ];

  const tab = tabs.find((item) => item.value === currentTab);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {tab.label}
        </Typography>
        <Typography variant="subtitle2">
          {tab.description}
        </Typography>
      </Grid>

      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          {tab.addText}
        </Button>
        {
          currentTab === 1 ?
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>耗材信息</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="ingr_id"
                  label="耗材编号"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={formValue.ingr_id}
                  onChange={(e) => handleFormChange('ingr_id', e)}
                  style={{ minWidth: '400px' }}
                  error={!!formErrors.ingr_id}
                  helperText={formErrors.ingr_id}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="ingr_name"
                  label="耗材名称"
                  fullWidth
                  variant="standard"
                  value={formValue.ingr_name}
                  onChange={(e) => handleFormChange('ingr_name', e)}
                  error={!!formErrors.ingr_name}
                  helperText={formErrors.ingr_name}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="ingr_type"
                  label="耗材类型"
                  fullWidth
                  value={formValue.ingr_type}
                  onChange={(e) => handleFormChange('ingr_type', e)}
                  variant="standard"
                  error={!!formErrors.ingr_name}
                  helperText={formErrors.ingr_name}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="ingr_description"
                  label="耗材描述"
                  fullWidth
                  variant="standard"
                  value={formValue.ingr_description}
                  onChange={(e) => handleFormChange('ingr_description', e)}
                  error={!!formErrors.ingr_description}
                  helperText={formErrors.ingr_description}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>退出</Button>
                <Button onClick={handleSubmit}>确定</Button>
              </DialogActions>
            </Dialog>
            :
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>耗材管理记录</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="record_id"
                  label="记录编号"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.record_id}
                  onChange={(e) => handleIngredientRecordFormChange('record_id', e)}
                  style={{ minWidth: '400px' }}
                  error={!!ingredientRecordFormErros.record_id}
                  helperText={ingredientRecordFormErros.record_id}
                />
                <FormControl
                  sx={{ width: '100%', marginTop: '12px' }}
                  error={!!ingredientRecordFormErros.ingr_id}
                >
                  <InputLabel id="employee_id">耗材</InputLabel>
                  <Select
                    autoFocus
                    labelId="employee_id"
                    margin="dense"
                    id="employee_id"
                    label="耗材"
                    placeholder="耗材"
                    value={ingredientRecordFormValue.ingr_id}
                    onChange={(e) => handleIngredientRecordFormChange('ingr_id', e)}
                  >
                    {
                      ingredients.map((item) =>
                        <MenuItem
                          key={item.ingr_id}
                          value={item.ingr_id}
                        >{item.ingr_name}</MenuItem>)
                    }
                  </Select>
                  <FormHelperText>{ingredientRecordFormErros.ingr_id}</FormHelperText>
                </FormControl>

                <FormControl
                  sx={{ width: '100%', marginTop: '12px' }}
                  error={!!ingredientRecordFormErros.record_type}
                >
                  <InputLabel id="employee_id">记录类型</InputLabel>
                  <Select
                    autoFocus
                    labelId="record_type"
                    margin="dense"
                    id="record_type"
                    label="记录类型"
                    placeholder="记录类型"
                    value={ingredientRecordFormValue.record_type}
                    onChange={(e) => handleIngredientRecordFormChange('record_type', e)}
                  >
                    {recordTypes.map((item) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{ingredientRecordFormErros.record_type}</FormHelperText>
                </FormControl>

                <TextField
                  autoFocus
                  margin="dense"
                  id="purchases"
                  type="number"
                  label="数量"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.purchases}
                  onChange={(e) => handleIngredientRecordFormChange('purchases', e)}
                  error={!!ingredientRecordFormErros.purchases}
                  helperText={ingredientRecordFormErros.purchases}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="measure_unit"
                  label="单位"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.measure_unit}
                  onChange={(e) => handleIngredientRecordFormChange('measure_unit', e)}
                  error={!!ingredientRecordFormErros.measure_unit}
                  helperText={ingredientRecordFormErros.measure_unit}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="shelf_life"
                  type="number"
                  label="保质期(天)"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.shelf_life}
                  onChange={(e) => handleIngredientRecordFormChange('shelf_life', e)}
                  error={!!ingredientRecordFormErros.shelf_life}
                  helperText={ingredientRecordFormErros.shelf_life}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="price"
                  label="价格"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.price}
                  onChange={(e) => handleIngredientRecordFormChange('price', e)}
                  error={!!ingredientRecordFormErros.price}
                  helperText={ingredientRecordFormErros.price}
                />

                <FormControl
                  sx={{ width: '100%', marginTop: '12px' }}
                  error={!!ingredientRecordFormErros.director_id}
                >
                  <InputLabel id="employee_id">负责人</InputLabel>
                  <Select
                    autoFocus
                    labelId="employee_id"
                    id="employee_id"
                    label="负责人"
                    placeholder="负责人"
                    value={ingredientRecordFormValue.director_id}
                    onChange={(e) => handleIngredientRecordFormChange('director_id', e)}
                  >
                    {
                      employees.map((employee) =>
                        <MenuItem
                          key={employee.employee_id}
                          value={employee.employee_id}
                        >{employee.employee_name}</MenuItem>)
                    }
                  </Select>
                  <FormHelperText>{ingredientRecordFormErros.director_id}</FormHelperText>
                </FormControl>

                <FormControl
                  sx={{ width: '100%', marginTop: '12px' }}
                  error={!!ingredientRecordFormErros.purchasing_date}
                >
                  <DesktopDatePicker
                    autoFocus
                    label="修改日期"
                    inputFormat="yyyy-MM-dd"
                    value={ingredientRecordFormValue.purchasing_date}
                    onChange={(e) => handleIngredientRecordFormDateChange('purchasing_date', e)}
                    renderInput={(params) => <TextField {...params} />}
                    maxDate={new Date()}
                  />
                  <FormHelperText>{ingredientRecordFormErros.purchasing_date}</FormHelperText>
                </FormControl>

                <FormControl
                  sx={{ width: '100%', marginTop: '12px' }}
                  error={!!ingredientRecordFormErros.produced_date}
                >
                  <DesktopDatePicker
                    autoFocus
                    label="生产日期"
                    inputFormat="yyyy-MM-dd"
                    value={ingredientRecordFormValue.produced_date}
                    onChange={(e) => handleIngredientRecordFormDateChange('produced_date', e)}
                    renderInput={(params) => <TextField {...params} />}
                    maxDate={new Date()}
                  />
                  <FormHelperText>{ingredientRecordFormErros.produced_date}</FormHelperText>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>退出</Button>
                <Button onClick={handleSubmitIngredientRecordForm}>确定</Button>
              </DialogActions>
            </Dialog>
        }
      </Grid>
    </Grid>
  );
}

export default PageHeader;
