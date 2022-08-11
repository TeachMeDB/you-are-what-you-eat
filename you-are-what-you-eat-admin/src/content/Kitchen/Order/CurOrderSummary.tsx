import {
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';

import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import Brightness1Icon from '@mui/icons-material/Brightness1';

import { curOrderApi } from '@/queries/cur_order';
import { FC, ChangeEvent, useState, useEffect, useCallback } from 'react';
import { CurOrder } from '@/models/cur_order';
import { useRefMounted } from '@/hooks/useRefMounted';
import { number } from 'yup/lib/locale';
import curOrder from 'pages/kitchen/order';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
    };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function CurOrderSummary() {

  const isMountedRef = useRefMounted();
  const [CurOrders, setCurOrders] = useState<CurOrder[]>([]);
  const [AllFinishedDishes, setAllFinishedDishes] = useState<number>(0);
  const getAllData = useCallback(async () => {
    try {
      let CurOrders = await curOrderApi.getCurOrder();
      let a = countAllFinishedDishes();
      if (isMountedRef()) {
        setCurOrders(CurOrders);
        setAllFinishedDishes(a);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);
  let AllDishes = 0;

  const countAllDishes = () => {
    let i = 0;
    CurOrders.map((item) => {
      i = i + item.dish.length;
    })
    return i;
  }
  const countAllFinishedDishes = () => {
    let i = 0;
    CurOrders.map((item) => {
      item.dish.map((item) => {
        if (item.status == "已完成")
          i++;
      })
    })
    return i;
  }
  AllDishes = countAllDishes();

  console.log(AllFinishedDishes);
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#FFA500', '#008000'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['未完成', '已完成'],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };
  let m = Math.round(((AllDishes - AllFinishedDishes) / AllDishes) * 100);
  let n = Math.round((AllFinishedDishes / AllDishes) * 100);

  const chartSeries = [m, n];

  console.log(CurOrders);
  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              菜品统计
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {AllDishes + ""}
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant="rounded"
                >
                  <TrendingUp fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography variant="h4">+ 8</Typography>
                  <Typography variant="subtitle2" noWrap>
                    今天
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                />
              </Grid>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: '100%'
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <Brightness1Icon fontSize="large" color="warning" />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="未完成"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary={(AllDishes - AllFinishedDishes).toString()}
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        {m.toString() + "%"}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <Brightness1Icon fontSize="large" color="success" />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="已完成"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary={AllFinishedDishes.toString()}
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        {n.toString() + "%"}
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default CurOrderSummary;
