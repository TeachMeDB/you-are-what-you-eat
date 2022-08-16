import React, { ChangeEvent, FC, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { IngredientInfo } from '@/models/ingredient_info';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { queryIngredientApi } from '@/queries/query_ingredient';

interface IngredientInfoTableProps {
  className?: string;
  ingredientInfoes: IngredientInfo[];
  setIngredientInfoes: any;
}

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);

const RecentIngredientTable: FC<IngredientInfoTableProps> = (props) => {
  const { ingredientInfoes, setIngredientInfoes } = props;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const [keyword, setKeyword] = useState('');
  const [formValue, setFormValue] = useState({
    ingr_id: 0,
    ingr_name: '',
    ingr_type: '',
    ingr_description: ''
  });
  const [open, setOpen] = React.useState(false);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };
  const handleClickOpen = (ingredientInfo) => {
    setFormValue(ingredientInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log(formValue, ' <-- formValue');
    await queryIngredientApi.updateIngredient(formValue);
    const data = await queryIngredientApi.getIngredientList(keyword);
    setIngredientInfoes(data);
    setOpen(false);
  };

  const handleSearch = async () => {
    const data = await queryIngredientApi.getIngredientList(keyword);
    console.log(data, ' <-- data');
    setPage(0);
    setIngredientInfoes(data);
  };

  const handleFormChange = (field, e) => {
    console.log(field, ' <-- field');
    setFormValue({ ...formValue, [field]: e.target.value });
  };

  const handleDelete = async (id: string) => {
    await queryIngredientApi.deleteIngredient(id);
    setIngredientInfoes(ingredientInfoes.filter((val) => val.ingr_id != id));
  };

  const data = ingredientInfoes.slice(page * limit, page * limit + limit);

  const theme = useTheme();
  return (
    <Card>
      {
        <CardHeader
          action={
            <FormControl variant="outlined" fullWidth>
              <OutlinedInputWrapper
                type="text"
                placeholder="输入耗材名称"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <ButtonSearch
                      variant="contained"
                      size="small"
                      onClick={handleSearch}
                    >
                      搜索
                    </ButtonSearch>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          }
          title="耗材信息列表"
        />
      }
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>耗材编号</TableCell>
              <TableCell>耗材名称</TableCell>
              <TableCell>耗材类型</TableCell>
              <TableCell>耗材描述</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ingredientInfo) => {
              return (
                <TableRow hover key={ingredientInfo.ingr_id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ingredientInfo.ingr_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ingredientInfo.ingr_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ingredientInfo.ingr_type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ingredientInfo.ingr_description}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Tooltip
                      title="编辑"
                      arrow
                      onClick={() => handleClickOpen(ingredientInfo)}
                    >
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>耗材信息</DialogTitle>
                      <DialogContent>
                        <TextField
                          disabled
                          margin="dense"
                          id="ingr_id"
                          label="耗材编号"
                          type="number"
                          fullWidth
                          variant="standard"
                          value={formValue.ingr_id}
                          style={{ minWidth: '400px' }}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="ingr_name"
                          label="新的耗材名称"
                          fullWidth
                          variant="standard"
                          value={formValue.ingr_name}
                          onChange={(e) => handleFormChange('ingr_name', e)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="ingr_type"
                          label="新的耗材类型"
                          fullWidth
                          value={formValue.ingr_type}
                          onChange={(e) => handleFormChange('ingr_type', e)}
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="ingr_description"
                          label="新的耗材描述"
                          fullWidth
                          variant="standard"
                          value={formValue.ingr_description}
                          onChange={(e) =>
                            handleFormChange('ingr_description', e)
                          }
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>取消</Button>
                        <Button onClick={handleSubmit}>确定</Button>
                      </DialogActions>
                    </Dialog>
                    <Tooltip arrow title="删除">
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDelete(ingredientInfo.ingr_id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={ingredientInfoes.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentIngredientTable.propTypes = {
  ingredientInfoes: PropTypes.array.isRequired
};

RecentIngredientTable.defaultProps = {
  ingredientInfoes: []
};

export default RecentIngredientTable;
