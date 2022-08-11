import { Typography, Button, Grid, Tabs, Tab, InputLabel, Select, MenuItem } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';
import { queryIngredientApi } from '@/queries/query_ingredient';
import { queryIngredientRecordApi } from '@/queries/query_ingredient_record';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/lab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
      margin-bottom: 12px;
    }
`,
);

function PageHeader(props) {
  const {
    employees = [], ingredients = [], currentTab = 1,
    handleTabsChange, setIngredientInfoes, setIngredientRecordInfoes,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState(
    { ingr_id: 0, ingr_name: '', ingr_type: '', ingr_description: '' });
  const defaultIngredientRecordValue = {
    record_id: 0,
    ingr_id: 0,
    purchasing_date: null,
    measure_unit: '',
    shelf_life: '0',
    produced_date: null,
    price: '',
    director_id: 0,
  };
  const [ingredientRecordFormValue, setIngredientRecordFormValue] = useState(defaultIngredientRecordValue);
  console.log(employees, ' <-- ingredientRecordFormValue');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    await queryIngredientApi.addIngredient(formValue);
    const data = await queryIngredientApi.getIngredientList('');
    setIngredientInfoes(data);
    setOpen(false);
  };
  const handleSubmitIngredientRecordForm = async () => {
    console.log(ingredientRecordFormValue, ' <-- ingredientRecordFormValue');
    const { purchasing_date, produced_date, ...params } = ingredientRecordFormValue;
    await queryIngredientRecordApi.addIngredientRecord({
      ...params,
      purchasing_date: format(purchasing_date, 'yyyy-MM-dd'),
      produced_date: format(produced_date, 'yyyy-MM-dd'),
    });
    const data = await queryIngredientRecordApi.getIngredientRecordList();
    setIngredientRecordInfoes(data);
    setOpen(false);
    setIngredientRecordFormValue(defaultIngredientRecordValue);
  };

  const handleFormChange = (field, e) => {
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  const handleIngredientRecordFormChange = (field, e) => {
    setIngredientRecordFormValue({ ...ingredientRecordFormValue, [field]: e.target.value });
  };

  const handleIngredientRecordFormDateChange = (field, e) => {
    setIngredientRecordFormValue({ ...ingredientRecordFormValue, [field]: e });
  };

  const tabs = [
    { value: 1, label: '耗材', description: '查看并编辑所有耗材信息', addText: '新增耗材' },
    { value: 2, label: '耗材管理', description: '查看并编辑所有耗材管理记录', addText: '新增耗材管理记录' },
  ];

  const tab = tabs.find(item => item.value === currentTab);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <TabsWrapper
          onChange={(_, value) => handleTabsChange(value)}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </TabsWrapper>
        <Typography variant="subtitle2" style={{ marginTop: '12px' }}>
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
                />
                <InputLabel id="employee_id">耗材</InputLabel>
                <Select
                  autoFocus
                  labelId="employee_id"
                  margin="dense"
                  id="employee_id"
                  label="耗材"
                  placeholder="耗材"
                  fullWidth
                  variant="standard"
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
                <TextField
                  autoFocus
                  margin="dense"
                  id="measure_unit"
                  label="原料的计量单位"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.measure_unit}
                  onChange={(e) => handleIngredientRecordFormChange('measure_unit', e)}
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
                />
                <InputLabel id="employee_id">负责人</InputLabel>
                <Select
                  autoFocus
                  labelId="employee_id"
                  margin="dense"
                  id="employee_id"
                  label="负责人"
                  placeholder="负责人"
                  fullWidth
                  variant="standard"
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
                <Box
                  sx={{
                    marginTop: '16px',
                  }}
                >
                  <DesktopDatePicker
                    autoFocus
                    label="购买日期"
                    inputFormat="yyyy-MM-dd"
                    value={ingredientRecordFormValue.purchasing_date}
                    onChange={(e) => handleIngredientRecordFormDateChange('purchasing_date', e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '16px',
                  }}
                >
                  <DesktopDatePicker
                    autoFocus
                    label="生产日期"
                    inputFormat="yyyy-MM-dd"
                    value={ingredientRecordFormValue.produced_date}
                    onChange={(e) => handleIngredientRecordFormDateChange('produced_date', e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
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
