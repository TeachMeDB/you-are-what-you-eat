import {
  Button,
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
import Text from 'src/components/Text';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { CryptoSummary } from '@/models/crypto_table';
import { FC, ChangeEvent, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';


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
  background: ${
    theme.palette.mode === 'dark'
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

interface TableSummaryProps {
  className?: string;
  cryptoSummary: CryptoSummary;
}


//function TableSummary(cryptoSummary: CryptoSummary) 
const TableSummarySkeleton = () =>
{
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
    colors: ['#6169E1', '#FFA500', '#008000', '#6169E1'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Number(val).toFixed(1) + '%';
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
    labels: ['空闲', '占用'],
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

  const chartSeries = [
    (0.5), 
  (0.5)
];

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
              场地统计
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                <Skeleton animation="wave" variant="text" />
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
                  <Typography variant="h4"> <Skeleton animation="wave" variant="text" /> </Typography>
                  <Typography variant="subtitle2" noWrap>
                    今日接待
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
                       <Brightness1Icon fontSize="large" color="primary"/>
                    </ListItemAvatarWrapper>
                    <Skeleton animation="wave" variant="text" />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                      <Skeleton animation="wave" variant="text" />
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <Brightness1Icon fontSize="large" color="warning"/>
                    </ListItemAvatarWrapper>
                    <Skeleton animation="wave" variant="text" />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                      <Skeleton animation="wave" variant="text" />
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

export default TableSummarySkeleton;
