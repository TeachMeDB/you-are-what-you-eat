import {
    CardContent,
    Box,
    CardHeader,
    Card,
    Grid,
    Typography,
    alpha,
    LinearProgress,
    Divider,
    Button,
    styled,
    linearProgressClasses,
    useTheme
  } from '@mui/material';
  import { Chart } from 'src/components/Chart';
  import type { ApexOptions } from 'apexcharts';
  import { useTranslation } from 'react-i18next';
  import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
  import { arrSum } from '@/utils/array';
  
  const LinearProgressError = styled(LinearProgress)(
    ({ theme }) => `
      height: 12px;
      border-radius: ${theme.general.borderRadiusLg};
  
      &.${linearProgressClasses.colorPrimary} {
          background-color: ${alpha(theme.colors.error.main, 0.3)};
      }
      
      & .${linearProgressClasses.bar} {
          border-radius: ${theme.general.borderRadiusLg};
          background-color: ${theme.colors.error.main};
      }
  `
  );
  
  function EnergySurplusUI( data: {
    total: number[],
    respectively: {
        name: string,
        type: 'area',
        data: number[]
    }[]
} ) {
    const { t }: { t: any } = useTranslation();
    const theme = useTheme();
  
    const chart3Options: ApexOptions = {
      stroke: {
        curve: 'smooth',
        colors: [
          theme.colors.primary.main,
          theme.colors.alpha.black[70],
          theme.colors.warning.main
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
        theme.colors.primary.main,
        theme.colors.alpha.black[70],
        theme.colors.warning.main
      ],
      fill: {
        opacity: [0.5, 0.3, 1],
        colors: [
          theme.colors.primary.main,
          theme.colors.alpha.black[50],
          theme.colors.warning.main
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
  
    return (
      <Card>
        <CardHeader
          sx={{
            p: 3
          }}
          action={
            <Button
              size="small"
              variant="outlined"
              endIcon={<ExpandMoreTwoToneIcon />}
            >
              {t('Export')}
            </Button>
          }
          title={t('年度能源用量总览')}
        />
        <Divider />
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography
                component="div"
                color="text.secondary"
                variant="h4"
                gutterBottom
              >
                {t('总用量')}
              </Typography>
              <Typography component="div" variant="h3">
                {`${data.total[0]} Ton + ${data.total[1]} kwh + ${data.total[2]} m^3`}
              </Typography>
            </Grid>
            {arrSum(data.total, (e) => e) !== 0 ?(<Grid item xs={12} sm={6}>
              <Typography
                component="div"
                color="text.secondary"
                variant="h4"
                sx={{
                  pb: 1
                }}
              >
                {t('本月占比')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    mr: 1.5
                  }}
                >
                  <LinearProgressError variant="determinate" 
                  value={100 * arrSum(data.respectively.map((d) => d.data[new Date().getMonth()]), (e) => e) / arrSum(data.total, (e) => e)} />
                </Box>
                <Box
                  sx={{
                    minWidth: 35
                  }}
                >
                  <Typography variant="h5">
                    {`${(100 * arrSum(data.respectively.map((d) => d.data[new Date().getMonth()]), (e) => e) / arrSum(data.total, (e) => e)).toFixed(0)}%`}
                  </Typography>
                </Box>
              </Box>
            </Grid>) : null}
          </Grid>
          <Chart
            options={chart3Options}
            series={data.respectively}
            type="area"
            height={348}
          />
        </CardContent>
      </Card>
    );
  }
  
  export default EnergySurplusUI;
  