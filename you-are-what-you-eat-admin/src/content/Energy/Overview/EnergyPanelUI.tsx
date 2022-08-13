import {
    Grid,
    Box,
    Card,
    Typography,
    IconButton,
    Button,
    styled,
    useTheme,
    Tooltip
  } from '@mui/material';
  
  import { useTranslation } from 'react-i18next';
  import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
  import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
  import { buildStyles } from 'react-circular-progressbar';
  import type { EnergyPanelData } from '@/models/energy';
  
  const DotLegend = styled('span')(
    ({ theme }) => `
        border-radius: 22px;
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: ${theme.spacing(0.5)};
    `
  );
  
  const CardActions = styled(Box)(
    ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      top: ${theme.spacing(2)};
      z-index: 7;
    `
  );
  
  function EnergyPanelUI(edata: EnergyPanelData[]) {
    const { t }: { t: any } = useTranslation();
    const theme = useTheme();
  
    return (
      <Grid container spacing={4}>
        {edata.map((data => (<Grid item xs={12} md={4}>
          <Card
            sx={{
              position: 'relative'
            }}
          >
            <Typography
              sx={{
                py: 3,
                fontSize: `${theme.typography.pxToRem(18)}`
              }}
              variant="h4"
              textAlign="center"
            >
              {t(data.type)}
            </Typography>
            <CardActions>
              <IconButton size="small" color="secondary">
                <MoreVertTwoToneIcon />
              </IconButton>
            </CardActions>
            <Box
              sx={{
                mx: 'auto',
                maxWidth: '170px'
              }}
            >
              <CircularProgressbarWithChildren
                circleRatio={1}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 4,
                  trailColor: theme.colors.warning.main,
                  pathColor: theme.colors.primary.main,
                  strokeLinecap: 'round'
                })}
                strokeWidth={9}
                value={data.weekly === 0 ? 100 : data.daily / data.weekly * 100}
              >
                <Typography
                  color="primary"
                  sx={{
                    mt: -2
                  }}
                  variant="h1"
                >
                  {`${data.weekly === 0 ? 100 : (data.daily / data.weekly * 100).toFixed(2)}%`}
                </Typography>
              </CircularProgressbarWithChildren>
            </Box>
            <Box
              my={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                mx={0.5}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <DotLegend
                  style={{
                    background: `${theme.colors.primary.main}`
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    lineHeight: 1
                  }}
                  variant="subtitle2"
                  color="text.primary"
                >
                  {t(`今日`)}
                </Typography>
              </Box>
              <Box
                mx={0.5}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <DotLegend
                  style={{
                    background: `${theme.colors.warning.main}`
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    lineHeight: 1
                  }}
                  variant="subtitle2"
                  color="text.primary"
                >
                  {t(`本周`)}
                </Typography>
              </Box>
            </Box>
            <Box mx={3} pt={1} mb={3}>
              <Tooltip
                title={`今日用量：${data.daily}` + `，本周用量：${data.weekly}`}
              >
              <Button
                fullWidth
                variant="text"
                color="secondary"
                sx={{
                  backgroundColor: `${theme.colors.secondary.lighter}`,
                  py: 1,
                  fontSize: `${theme.typography.pxToRem(13)}`,
                  textTransform: 'uppercase',
                  '&:hover': {
                    backgroundColor: `${theme.colors.secondary.main}`,
                    color: `${theme.palette.getContrastText(
                      theme.colors.secondary.main
                    )}`
                  }
                }}
              >
                {t('当前用量')}
              </Button>
              </Tooltip>
            </Box>
          </Card>
        </Grid>)))}
      </Grid>
    );
  }
  
  export default EnergyPanelUI;
  