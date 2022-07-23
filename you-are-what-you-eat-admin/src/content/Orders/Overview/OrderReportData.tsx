import {
    Box,
    Card,
    CardHeader,
    Typography,
    Stack,
    Button,
    Divider,
    useTheme,
    styled
  } from '@mui/material';
  
  import { useTranslation } from 'react-i18next';
  import { Chart } from 'src/components/Chart';
  import type { ApexOptions } from 'apexcharts';
  import Text from 'src/components/Text';
  import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
  import type { OrderReport } from '@/models/order';
  
  const CardWrapper = styled(Card)(
    ({ theme }) => `
            background: ${theme.colors.alpha.black[5]};
    `
  );
  
  function OrderReportData( data: OrderReport ) {
    const { t }: { t: any } = useTranslation();
    const theme = useTheme();
  
    const Box1Options: ApexOptions = {
      chart: {
        background: 'transparent',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        },
        zoom: {
          enabled: false
        }
      },
      colors: [theme.colors.primary.main],
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      theme: {
        mode: theme.palette.mode
      },
      fill: {
        opacity: 1,
        colors: [theme.colors.primary.light],
        type: 'solid'
      },
      stroke: {
        show: true,
        colors: [theme.colors.primary.main],
        width: 3
      },
      legend: {
        show: false
      },
      xaxis: {
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        min: 0
      }
    };
    const Box1Data = [
      {
        name: 'Top grossing products',
        data: [4, 60, 30, 60, 11, 30, 10, 30, 6]
      }
    ];
  
    return (
      <Card>
        <CardHeader
          sx={{
            p: 2
          }}
          titleTypographyProps={{
            component: 'h4',
            variant: 'h3'
          }}
          action={
            <Button size="small" variant="text">
              {'View all'}
            </Button>
          }
          title={t('订单报告')}
        />
        <Divider />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Box
            sx={{
              width: '100%'
            }}
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography gutterBottom variant="h4">
                {t('早餐订单数')}
              </Typography>
              <Typography variant="subtitle2">
                {t('Monthly sales reports')}
              </Typography>
            </Box>
            <Text color="warning">
              <Typography variant="h4">{data.breakfast_order_num}</Typography>
            </Text>
          </Box>
          <Box
            sx={{
              width: '100%'
            }}
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography gutterBottom variant="h4">
                {t('早餐营业额')}
              </Typography>
              <Typography variant="subtitle2">
                {t('Last month targets')}
              </Typography>
            </Box>
            <Text color="warning">
              <Typography variant="h4">{`￥${data.breakfast_turnover}`}</Typography>
            </Text>
          </Box>
        </Stack>
        <Divider />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Box
            sx={{
              width: '100%'
            }}
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography gutterBottom variant="h4">
                {t('午餐订单数')}
              </Typography>
              <Typography variant="subtitle2">
                {t('Visitors last week')}
              </Typography>
            </Box>
            <Text color="success">
              <Typography variant="h4">{data.lunch_order_num}</Typography>
            </Text>
          </Box>
          <Box
            sx={{
              width: '100%'
            }}
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography gutterBottom variant="h4">
                {t('午餐营业额')}
              </Typography>
              <Typography variant="subtitle2">{t("Week's expenses")}</Typography>
            </Box>
            <Text color="success">
              <Typography variant="h4">{`￥${data.lunch_turnover}`}</Typography>
            </Text>
          </Box>
        </Stack>
        <Divider />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Box
            sx={{
              width: '100%'
            }}
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography gutterBottom variant="h4">
                {t('晚餐订单数')}
              </Typography>
              <Typography variant="subtitle2">
                {t('Total average weekly report')}
              </Typography>
            </Box>
            <Text color="primary">
              <Typography variant="h4">{data.dinner_order_num}</Typography>
            </Text>
          </Box>
          <Box
            sx={{
              width: '100%'
            }}
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography gutterBottom variant="h4">
                {t('晚餐营业额')}
              </Typography>
              <Typography variant="subtitle2">
                {t('Total products ordered')}
              </Typography>
            </Box>
            <Text color="primary">
              <Typography variant="h4">{`￥${data.dinner_turnover}`}</Typography>
            </Text>
          </Box>
        </Stack>
        <CardWrapper
          elevation={0}
          sx={{
            mt: 3,
            mx: 3,
            mb: 4,
            p: 2,
            textAlign: 'center'
          }}
        >
          <Button
            size="small"
            color="primary"
            variant="contained"
            endIcon={<ArrowForwardTwoToneIcon />}
          >
            {t('View details')}
          </Button>
        </CardWrapper>
        <Chart options={Box1Options} series={Box1Data} type="area" height={167} />
      </Card>
    );
  }
  
  export default OrderReportData;
  