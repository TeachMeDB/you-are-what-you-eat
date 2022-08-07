import React from 'react'


import { ChangeEvent, useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    Card,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    styled,
    InputAdornment,
    Typography,
    useTheme,
    CardHeader,
    OutlinedInput,
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { MealInfo } from '@/models/meal_info';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';


import { mealInfoApi } from '@/queries/meal';

import { useRefMounted } from '@/hooks/useRefMounted';
import stockInfo from 'pages/kitchen/stock';
let m: MealInfo = {
    id: '123',
    dis_name: '123',
    price: 123,
    description: '123',
    tags: [""]
}

const applyPagination = (
    mealInfoes: MealInfo[],
    page: number,
    limit: number
): MealInfo[] => {
    return mealInfoes.slice(page * limit, page * limit + limit);
};







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



const MealInfoTable = () => {


    const nameInputChange = (e) => {
        m.dis_name = e.target.value;
    }
    const priceInputChange = (e) => {
        m.price = Number(e.target.value);
    }
    const descriptionInputChange = (e) => {
        m.description = e.target.value;
    }
    const tagsInputChange = (e) => {
        m.tags = e.target.value.split(" ");
        console.log(m.tags);
    }

    const isMountedRef = useRefMounted();
    const [MealInfoes, setMealInfoes] = useState<MealInfo[]>([]);


    const getAllData = useCallback(async () => {
        try {
            let MealInfoes = await mealInfoApi.getMealInfo();
            console.log(MealInfoes);
            if (isMountedRef()) {
                setMealInfoes(MealInfoes);
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllData();
    }, [getAllData]);



    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const handlePageChange = (_event: any, newPage: number): void => {
        setPage(newPage);

    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const paginatedPromotions = applyPagination(MealInfoes, page, limit);

    const theme = useTheme();
    const newM: MealInfo[] = [];

    var Search: string;


    const handleSearchChange = (e) => {
        Search = e.target.value;
        MealInfoes.map((item) => {
            if (item.dis_name === (Search)) {
                console.log(item);
                newM.push(item);
            }

        })
    }
    const handleSearchClick = () => {
        setMealInfoes(newM);
    }
    console.log(MealInfoes);
    return (
        <Card>
            {(
                <CardHeader
                    action={
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInputWrapper
                                onChange={handleSearchChange}
                                type="text"
                                placeholder="输入菜品名称"
                                endAdornment={
                                    <InputAdornment position="end" >
                                        <ButtonSearch variant="contained" size="small" onClick={handleSearchClick} >
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
                    title="菜品信息列表"
                />
            )}
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>

                            <TableCell>菜品编号</TableCell>
                            <TableCell>菜品名称</TableCell>
                            <TableCell >价格</TableCell>
                            <TableCell>菜品描述</TableCell>
                            <TableCell>菜品标签</TableCell>
                            <TableCell >操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedPromotions.map((mealInfo) => {
                            {
                                return (
                                    <TableRow hover>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {mealInfo.id}
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
                                                {mealInfo.dis_name}
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
                                                {mealInfo.price}
                                            </Typography>

                                        </TableCell>
                                        <TableCell >
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {mealInfo.description}

                                            </Typography>

                                        </TableCell>
                                        <TableCell >
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {mealInfo.tags}

                                            </Typography>

                                        </TableCell>

                                        <TableCell >
                                            <Tooltip title="编辑" arrow onClick={handleClickOpen}>
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
                                                <DialogTitle>菜品信息</DialogTitle>
                                                <DialogContent>


                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="新的菜品名称"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={nameInputChange}
                                                    />
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="price"
                                                        label="新的菜品价格"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={priceInputChange}
                                                    />
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="description"
                                                        label="新的菜品描述"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={descriptionInputChange}
                                                    />
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="tags"
                                                        label="新的菜品标签"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={tagsInputChange}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>取消</Button>
                                                    <Button onClick={() => {
                                                        m.id = mealInfo.id;
                                                        console.log(m);
                                                        const conduct = async () => {
                                                            return mealInfoApi.updateMeal(m);
                                                        }

                                                        conduct().then((value) => {

                                                            alert("修改成功：" + value);

                                                        }).catch((value) => {

                                                            alert("修改失败：" + value);
                                                        });

                                                    }} href="javascript:location.reload(true)">确定</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Tooltip title="删除" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': { background: theme.colors.error.lighter },
                                                        color: theme.palette.error.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        const conduct = async () => {
                                                            return mealInfoApi.delMeal(mealInfo.id);
                                                        }

                                                        conduct().then((value) => {

                                                            alert("成功：" + value);

                                                        }).catch((value) => {

                                                            alert("失败：" + value);
                                                        });

                                                    }}
                                                >
                                                    <DeleteTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={MealInfoes.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>
        </Card >
    );
};

MealInfoTable.propTypes = {
    mealInfoes: PropTypes.array.isRequired
};

MealInfoTable.defaultProps = {
    mealInfoes: []
};

export default MealInfoTable;
