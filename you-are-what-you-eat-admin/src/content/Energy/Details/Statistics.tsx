import { Box, Card, Grid, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DotRunning = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.success.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const DotCompleted = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.info.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const DotReady = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.warning.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

function Statistics( water: number, power: number, gas: number ) {
  const { t }: { t: any } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
      <Card
          sx={{
            height: '100%',
            px: 3,
            py: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2
              }}
            >
              <DotRunning />
              {t('水表')}
            </Typography>
            <Typography variant="h3">
              {water}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            height: '100%',
            px: 3,
            py: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2
              }}
            >
              <DotReady />
              {t('电表')}
            </Typography>
            <Typography variant="h3">
              {power}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            height: '100%',
            px: 3,
            py: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2
              }}
            >
              <DotCompleted />
              {t('燃气')}
            </Typography>
            <Typography variant="h3">
              {gas}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Statistics;
