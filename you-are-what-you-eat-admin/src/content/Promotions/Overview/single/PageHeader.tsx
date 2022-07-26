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

import type { Promotion } from 'src/models/promotion';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import PropTypes from 'prop-types';

interface PageHeaderProps {
  promotion: Promotion;
}

const PageHeader: FC<PageHeaderProps> = ({ promotion }) => {
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
                href="/promotions/overview"
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
                #{promotion.name}
              </Typography>
              <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link color="inherit" href="#">
                  {t('Home')}
                </Link>
                <Link color="inherit" href="#">
                  {t('促销活动管理')}
                </Link>
                <Link color="inherit" href="#">
                  {t('促销活动详情')}
                </Link>
                <Typography color="text.primary">
                  {t('促销活动')} #{promotion.name}
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
            href="/promotions/overview"
            variant="contained"
          >
            {t('View all invoices')}
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
