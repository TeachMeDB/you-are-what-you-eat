import { FC } from 'react';
import {
  Breadcrumbs,
  Box,
  Grid,
  Typography,
  Tooltip,
  Button,
  Container,
  IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Link from 'src/components/Link';
import type { OrderDetail } from '@/models/order';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import PropTypes from 'prop-types';

interface PageHeaderProps {
  detail: OrderDetail;
}

const PageHeader: FC<PageHeaderProps> = ({ detail }) => {
  const { t }: { t: any } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Tooltip arrow placement="top" title={t('Go back')}>
              <IconButton
                href="/orders/overview"
                color="primary"
                sx={{
                  p: 2,
                  mr: 2
                }}
              >
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                #{detail.order_id}
              </Typography>
              <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link color="inherit" href="#">
                  {t('Home')}
                </Link>
                <Link color="inherit" href="#">
                  {t('Orders')}
                </Link>
                <Typography color="text.primary">
                  {t('OrderDetail')} #{detail.order_id}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            href="/orders/overview"
            variant="contained"
          >
            {t('查看所有订单')}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

PageHeader.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};

export default PageHeader;
