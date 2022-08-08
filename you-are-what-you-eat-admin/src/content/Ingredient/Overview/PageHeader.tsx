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
    { ingr_id: '0', ingr_name: '', ingr_type: '', ingr_description: '' });
  const [ingredientRecordFormValue, setIngredientRecordFormValue] = useState({
    employee_id: '',
    ingr_id: '',
    ingredientRecord_type: '',
    ingredientRecord_date: new Date(),
    ingredientRecord_reason: '',
    ingredientRecord_cost: '',
  });
  console.log(employees, ' <-- ingredientRecordFormValue');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    console.log(formValue, ' <-- formValue');
    const { ingr_id, ...params } = formValue;

    await queryIngredientApi.addIngredient({ ...params, ingr_id: parseInt(ingr_id, 10) });
    const data = await queryIngredientApi.getIngredientList('');
    setIngredientInfoes(data);
    setOpen(false);
  };
  const handleSubmitIngredientRecordForm = async () => {
    console.log(ingredientRecordFormValue, ' <-- ingredientRecordFormValue');
    const { ingredientRecord_date, ...params } = ingredientRecordFormValue;
    await queryIngredientRecordApi.addIngredientRecord({
      ...params,
      ingredientRecord_date: format(ingredientRecord_date, 'yyyy-MM-dd'),
    });
    const data = await queryIngredientRecordApi.getIngredientRecordList();
    setIngredientRecordInfoes(data);
    setOpen(false);
  };

  const handleFormChange = (field, e) => {
    console.log(e, ' <-- e');
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  const handleIngredientRecordFormChange = (field, e) => {
    setIngredientRecordFormValue({ ...ingredientRecordFormValue, [field]: e.target.value });
  };

  const handleDateChange = (e) => {
    setIngredientRecordFormValue({ ...ingredientRecordFormValue, ingredientRecord_date: e });
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
                <InputLabel id="employee_id">耗材管理员</InputLabel>
                <Select
                  autoFocus
                  labelId="employee_id"
                  margin="dense"
                  id="employee_id"
                  label="耗材管理员"
                  placeholder="耗材管理员"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.employee_id}
                  onChange={(e) => handleIngredientRecordFormChange('employee_id', e)}
                >
                  {
                    employees.map((employee) =>
                      <MenuItem
                        key={employee.employee_id}
                        value={employee.employee_id}
                      >{employee.employee_name}</MenuItem>)
                  }
                </Select>
                <InputLabel id="ingr_id">耗材类型</InputLabel>
                <Select
                  autoFocus
                  labelId="ingr_id"
                  margin="dense"
                  id="ingr_id"
                  label="耗材类型"
                  placeholder="耗材类型"
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
                      >{item.ingredients_type}</MenuItem>)
                  }
                </Select>
                <TextField
                  autoFocus
                  margin="dense"
                  id="ingredientRecord_type"
                  label="耗材管理类型"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.ingredientRecord_type}
                  onChange={(e) => handleIngredientRecordFormChange('ingredientRecord_type', e)}
                />

                {/*<TextField*/}
                {/*  autoFocus*/}
                {/*  margin="dense"*/}
                {/*  id="ingredientRecord_date"*/}
                {/*  label="耗材管理日期"*/}
                {/*  fullWidth*/}
                {/*  variant="standard"*/}
                {/*  value={ingredientRecordFormValue.ingredientRecord_date}*/}
                {/*  onChange={(e) => handleIngredientRecordFormChange('ingredientRecord_date', e)}*/}
                {/*/>*/}
                <TextField
                  autoFocus
                  margin="dense"
                  id="ingredientRecord_reason"
                  label="耗材管理原因"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.ingredientRecord_reason}
                  onChange={(e) => handleIngredientRecordFormChange('ingredientRecord_reason', e)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="ingredientRecord_cost"
                  label="耗材管理耗费金额"
                  fullWidth
                  variant="standard"
                  value={ingredientRecordFormValue.ingredientRecord_cost}
                  onChange={(e) => handleIngredientRecordFormChange('ingredientRecord_cost', e)}
                />
                <Box
                  sx={{
                    marginTop: '16px',
                  }}
                >
                  <DesktopDatePicker
                    autoFocus
                    label="耗材管理日期"
                    inputFormat="yyyy-MM-dd"
                    value={ingredientRecordFormValue.ingredientRecord_date}
                    onChange={(e) => handleDateChange(e)}
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
