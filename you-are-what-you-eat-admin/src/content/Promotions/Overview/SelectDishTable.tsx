import { useState, ReactElement, Ref, forwardRef } from 'react';
import type { FC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { Dispatch, SetStateAction } from 'react';

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
  Divider,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Typography,
  Dialog,
  FormControl,
  Select,
  InputLabel,
  InputAdornment,
  styled,
  Tooltip
} from '@mui/material';

import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import type { SelectableDish, SelectedDish } from '@/models/promotion';
import { useTranslation } from 'react-i18next';
import Label from 'src/components/Label';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { join } from '@/utils/array'

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface ResultsProps {
  selectableDishes: SelectableDish[],
  parentSelectedDishes: SelectedDish[],
  setParentSelectedDishes: Dispatch<SetStateAction<SelectedDish[]>>
}

interface Filters {
  tag?: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getDishLabel = (tag?: string): JSX.Element => {
  return (
    tag ? (
    <Label color='primary'>
      <b>{tag}</b>
    </Label>
  ) : null 
  );
};

const applyFilters = (
  dishes: SelectableDish[],
  query: string,
  filters: Filters
): SelectableDish[] => {
  return dishes.filter((dish) => {
    let matches = true;

    if (query) {
      const properties = ['name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (dish[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.tag && dish.tags.includes(filters.tag)) {
        matches = true;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && !dish['tags'].includes(value)) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (
  dishes: SelectableDish[],
  page: number,
  limit: number
): SelectableDish[] => {
  return dishes.slice(page * limit, page * limit + limit);
};

const SelectDishTable: FC<ResultsProps> = ({ 
    selectableDishes,
    parentSelectedDishes,
    setParentSelectedDishes
 }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    parentSelectedDishes.map((dish) => dish.name)
  );
  const { t }: { t: any } = useTranslation();
  // const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    tag: null
  });

  const statusOptions: string[] = ['全部'];
  selectableDishes.forEach((d) => {
    d.tags.forEach((t) => {
      if(!statusOptions.includes(t))
        statusOptions.push(t);
    })
  })

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== '全部') {
      value = e.target.value;
    }

    setFilters({
      tag: value
    });
  };

  const handleSelectAllDishes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedItems(
      event.target.checked ? selectableDishes.map((dish) => dish.name) : []
    );
  };

  const handleSelectOneDish = (
    _event: ChangeEvent<HTMLInputElement>,
    dishName: string
  ): void => {
    if (!selectedItems.includes(dishName)) {
      setSelectedItems((prevSelected) => [...prevSelected, dishName]);
      const price = selectableDishes.find((d) => d.name === dishName).price;
      setParentSelectedDishes((prevSelect) => [...prevSelect, { name:dishName, discount: 0.9, price: price }]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((name) => name !== dishName)
      );
      setParentSelectedDishes((prevSelected) =>
        prevSelected.filter((dish) => dish.name !== dishName)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredDishes = applyFilters(selectableDishes, query, filters);
  const paginatedDishes = applyPagination(filteredDishes, page, limit);
  const selectedSomeDishes =
    selectedItems.length > 0 && selectedItems.length < selectableDishes.length;
  const selectedAllDishes = selectedItems.length === selectableDishes.length;

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false);

    // enqueueSnackbar(t('Delete action completed successfully'), {
    //   variant: 'success',
    //   anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'right'
    //   },
    //   TransitionComponent: Zoom
    // });
  };

  return (
    <>
      <Card
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Grid alignItems="center" container spacing={3}>
          <Grid item xs={12} lg={7} md={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                m: 0
              }}
              onChange={handleQueryChange}
              placeholder={t('输入菜品名查找')}
              value={query}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={5} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t('类别')}</InputLabel>
              <Select
                value={filters.tag || 'all'}
                onChange={handleStatusChange}
                label={t('Status')}
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Box pl={2} display="flex" alignItems="center">
          <Checkbox
            checked={selectedAllDishes}
            indeterminate={selectedSomeDishes}
            onChange={handleSelectAllDishes}
          />
          {(
            <Box
              flex={1}
              p={2}
              display={{ xs: 'block', sm: 'flex' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="span" variant="subtitle1">
                  {t('已显示')}:
                </Typography>{' '}
                <b>{paginatedDishes.length}</b>个可选菜品（已经参与其他活动的菜品将被过滤）
              </Box>
              <TablePagination
                component="div"
                count={filteredDishes.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          )}
        </Box>
        <Divider />

        {paginatedDishes.length === 0 ? (
          <Typography
            sx={{
              py: 10
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {t("We couldn't find any invoices matching your search criteria")}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('菜品')}</TableCell>
                    <TableCell>{t('原价')}</TableCell>
                    <TableCell>{t('类型')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedDishes.map((dish) => {
                    const isDishSelected = selectedItems.includes(
                      dish.name
                    );
                    return (
                      <TableRow
                        hover
                        key={dish.name}
                        selected={isDishSelected}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Checkbox
                              checked={isDishSelected}
                              onChange={(event) =>
                                handleSelectOneDish(event, dish.name)
                              }
                              value={isDishSelected}
                            />
                            <Box pl={1}>
                              <Typography noWrap variant="subtitle2">
                                {dish.name}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {dish.price}
                          </Typography>
                        </TableCell>
                        <TableCell>
                        <Tooltip
                          title={join(dish.tags, '; ')}
                        >
                          <Typography noWrap>
                            {dish.tags.length > 0 ? getDishLabel(dish.tags[0]) : ''}
                          </Typography>
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
                count={filteredDishes.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          </>
        )}
      </Card>

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              pt: 4,
              px: 6
            }}
            variant="h3"
          >
            {t('你确定要删除该促销活动吗？')}?
          </Typography>

          <Typography
            align="center"
            sx={{
              pt: 2,
              pb: 4,
              px: 6
            }}
            fontWeight="normal"
            color="text.secondary"
            variant="h4"
          >
            {t("You won't be able to revert after deletion")}
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1
              }}
              onClick={closeConfirmDelete}
            >
              {t('Cancel')}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3
              }}
              variant="contained"
            >
              {t('Delete')}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

SelectDishTable.propTypes = {
  selectableDishes: PropTypes.array.isRequired
};

SelectDishTable.defaultProps = {
    selectableDishes: []
};

export default SelectDishTable;
