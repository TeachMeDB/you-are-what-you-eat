import PageHeader from 'src/content/Orders/Overview/PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';

import DishSaleVolume from '@/content/Orders/Overview/DishSaleVolume';
import BestSeller from '@/content/Orders/Overview/BestSeller';
import OrderReport from '@/content/Orders/Overview/OrderReport';
import ActiveVIP from '@/content/Orders/Overview/ActiveVIP';
import RecentOrders from '@/content/Orders/Overview/RecentOrders';
import StatisticCard from '@/content/Orders/Overview/StatisticCard';

function OrderOverviewContent() {
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <RecentOrders />
        </Grid>
        <Grid item xs={12}>
          <StatisticCard />
        </Grid>
        <Grid item xs={12}>
          <DishSaleVolume />
        </Grid>
        <Grid item xs={12} md={6}>
          <BestSeller />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderReport />
        </Grid>
        <Grid item xs={12}>
          <ActiveVIP />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default OrderOverviewContent;
