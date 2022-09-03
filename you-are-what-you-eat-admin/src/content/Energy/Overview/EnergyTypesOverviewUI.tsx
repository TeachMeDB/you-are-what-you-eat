import {
  Box,
  Card,
  Typography,
  Divider,
  Button,
  alpha,
  Stack,
  styled,
  useTheme,
  Tooltip
} from '@mui/material';
import ScreenSearchDesktopTwoToneIcon from '@mui/icons-material/ScreenSearchDesktopTwoTone';
import { useTranslation } from 'react-i18next';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import type { YearlyEnergyDataSortedByType } from '@/models/energy';
const DotLegend = styled('span')(
  ({ theme }) => `
        border-radius: 22px;
        width: ${theme.spacing(1.8)};
        height: ${theme.spacing(1.8)};
        display: inline-block;
        margin-right: ${theme.spacing(0.8)};
        border: ${theme.colors.alpha.white[100]} solid 2px;
    `
);

const CardWrapper = styled(Card)(
  ({ theme }) => `
        background: ${alpha(theme.colors.alpha.black[10], 0.08)};
    `
);

function EnergyTypesOverviewUI(data: YearlyEnergyDataSortedByType[]) {
  if (data.length < 3) return null;
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const chart3Options: ApexOptions = {
    stroke: {
      curve: 'smooth',
      colors: [
        theme.colors.info.main,
        theme.colors.error.main,
        theme.colors.success.main
      ],
      width: 3
    },
    theme: {
      mode: theme.palette.mode
    },
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: [
      theme.colors.info.main,
      theme.colors.error.main,
      theme.colors.success.main
    ],
    fill: {
      opacity: 1,
      colors: [
        theme.colors.info.main,
        theme.colors.error.main,
        theme.colors.success.main
      ],
      type: 'solid'
    },
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    dataLabels: {
      enabled: false
    },
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    legend: {
      show: false
    },
    yaxis: {
      show: false
    }
  };

  const chart3Data = [
    {
      name: data[0].type,
      data: data[0].consumption_list
    },
    {
      name: data[1].type,
      data: data[1].consumption_list
    },
    {
      name: data[2].type,
      data: data[2].consumption_list
    }
  ];

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        p={3}
        justifyContent="space-between"
      >
        <Box>
          <Typography
            component="div"
            sx={{
              fontSize: `${theme.typography.pxToRem(17)}`
            }}
            gutterBottom
            variant="h3"
          >
            {t('年度用量状况')}
          </Typography>
          <Typography
            component="div"
            fontWeight="normal"
            color="text.secondary"
            variant="h5"
          >
            {t('Energy Usage in this year')}
          </Typography>
        </Box>
        <Tooltip title={'未记录的和未到的月份记为0'}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ScreenSearchDesktopTwoToneIcon />}
          >
            {t('tip')}
          </Button>
        </Tooltip>
      </Box>
      <CardWrapper
        sx={{
          mx: 3,
          p: 3
        }}
      >
        <Stack
          direction="row"
          divider={
            <Divider
              sx={{
                background: `${theme.colors.alpha.black[10]}`
              }}
              orientation="vertical"
              flexItem
            />
          }
          justifyContent="space-evenly"
          alignItems="center"
          spacing={4}
        >
          <Box py={2} textAlign="center">
            <Typography
              variant="h4"
              fontWeight="normal"
              color="text.secondary"
              gutterBottom
            >
              {t('水')}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <DotLegend
                style={{
                  background: `${theme.colors.info.main}`
                }}
              />
              <Typography color="text.primary" variant="h4">
                {`${data[2].total_consumption}`}
              </Typography>
            </Box>
          </Box>
          <Box py={2} textAlign="center">
            <Typography
              variant="h4"
              fontWeight="normal"
              color="text.secondary"
              gutterBottom
            >
              {t('电')}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <DotLegend
                style={{
                  background: `${theme.colors.success.main}`
                }}
              />
              <Typography color="text.primary" variant="h4">
                {`${data[1].total_consumption}`}
              </Typography>
            </Box>
          </Box>
          <Box py={2} textAlign="center">
            <Typography
              variant="h4"
              fontWeight="normal"
              color="text.secondary"
              gutterBottom
            >
              {t('燃气')}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <DotLegend
                style={{
                  background: `${theme.colors.error.main}`
                }}
              />
              <Typography color="text.primary" variant="h4">
                {`${data[2].total_consumption}`}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardWrapper>
      <Box px={3}>
        <Chart
          options={chart3Options}
          series={chart3Data}
          type="line"
          height={318}
        />
      </Box>
    </Card>
  );
}

export default EnergyTypesOverviewUI;
