import React from 'react';

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
  OutlinedInput
} from '@mui/material';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { MealInfo, MealInfoUpload } from '@/models/meal_info';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';


import DetailsIcon from '@mui/icons-material/Details';
import { mealInfoApi } from '@/queries/meal';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useRefMounted } from '@/hooks/useRefMounted';
import {
  Grid,
  CardMedia,
} from '@mui/material';



import { useTranslation } from 'react-i18next';
const CardCover = styled(Card)(
  ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(26)};
      }
  `
);





let m: MealInfoUpload = {
  id: 123,
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




const getPriceStyles = () => {
  let styles = {
    color: "blue",
    fontSize: "24px",

  }
  return styles;
}


const ButtonSearch = styled(Button)(
  ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);




const MealInfoTable = () => {



  const { t }: { t: any } = useTranslation();
  const nameInputChange = (e) => {
    m.dis_name = (e.target.value);
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
  const [SearchMealInfoes, setSearchMealInfoes] = useState<MealInfo[]>([]);

  const getAllData = useCallback(async () => {
    try {
      let MealInfoes = await mealInfoApi.getMealInfo();
      console.log(MealInfoes);
      if (isMountedRef()) {
        setSearchMealInfoes(MealInfoes);
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
  const [idChange, setidChange] = useState<string>('');
  const [idLook, setIdLook] = useState<MealInfo>('');
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


  const [detailOpen, setdetailOpen] = React.useState(false);
  const handleClickDetailOpen = () => {
    setdetailOpen(true);

  };

  const handleDetailClose = () => {
    setdetailOpen(false);
  };

  const paginatedPromotions = applyPagination(MealInfoes, page, limit);

  const theme = useTheme();
  let newM: MealInfo[] = [];

  var Search: string;

  let bv = "BV1e5411L7gR";
  let src = "//player.bilibili.com/player.html?bvid=" + bv + "&high_quality=1&danmaku=0";

  const handleSearchChange = (e) => {
    newM = [];
    Search = e.target.value;
    SearchMealInfoes.map((item) => {
      if (item.dis_name.indexOf(Search) != -1) {
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
                      <Tooltip title="编辑" arrow onClick={() => {
                        setidChange(mealInfo.id);
                        handleClickOpen();
                      }
                      }>
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
                            m.id = Number(idChange);
                            console.log(idChange);
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
                          href="javascript:location.reload(true)"
                          onClick={() => {
                            const conduct = async () => {


                              return mealInfoApi.delMeal(
                                mealInfo.id)
                            }
                            conduct().then((value) => {
                              alert("删除成功：" + value);
                              window.location.reload();
                            }).catch((value) => {

                              alert("删除失败：" + value);
                            });
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="查看详情" arrow>
                        <IconButton
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.primary.dark
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleClickDetailOpen();
                            setIdLook(mealInfo);
                          }}
                        >
                          <DetailsIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Dialog open={detailOpen} onClose={handleDetailClose} fullWidth={true}>
                        <DialogTitle>菜品具体信息</DialogTitle>

                        <DialogContent>
                          <iframe src={src} allowfullscreen="allowfullscreen" width="100%" height="270px" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>
                          <Grid item xs={12}>
                            <Box m={2}>
                              <Box pb={1} mb={1}>
                                <b>{t('活动封面图')}:</b>
                              </Box>
                              <CardCover>
                                <CardMedia image={null} />

                              </CardCover>
                            </ Box>
                          </Grid>
                          <Card sx={{ minWidth: 75, m: 1 }} variant="outlined">
                            <div style={{ padding: '0 27px' }}>
                              <Grid container spacing={2}>
                                <Grid item xs={9}>
                                  <h2>{idLook.dis_name}</h2>
                                </Grid>
                                <Grid item xs={1}>
                                  <StarRateIcon sx={{ mt: 2.2, color: "blue", }} />
                                </Grid>
                                <Grid item xs={2}>
                                  <h2 style={{ fontWeight: '500', color: "blue" }}>{2}</h2>
                                </Grid>


                              </Grid>
                              <Divider />
                              <div>
                                <p style={{ fontSize: "18px" }}>{idLook.description}</p>
                              </div>
                              <Grid container spacing={2}>
                                <Grid item xs={7}>
                                  <div>
                                    <p style={getPriceStyles()}>¥ {idLook.price} / 份</p>
                                  </div>
                                </Grid>
                              </Grid>


                            </div>
                          </Card>



                        </DialogContent>

                      </Dialog>
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
