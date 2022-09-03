import { useTranslation } from 'react-i18next';
import { Typography, Grid } from '@mui/material';

function PageHeader() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('能源管理')}
          </Typography>
          <Typography variant="subtitle2">{t('能源原始数据')}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
