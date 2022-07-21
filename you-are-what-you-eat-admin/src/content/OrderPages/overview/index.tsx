import PageHeader from 'src/content/Orders/Overview/PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';

import Block1 from 'src/content/Orders/Overview/Block1';
import Block2 from 'src/content/Orders/Overview/Block2';
import Block4 from 'src/content/Orders/Overview/Block4';
import Block5 from 'src/content/Orders/Overview/Block5';
import Block6 from 'src/content/Orders/Overview/Block6';
import Block7 from 'src/content/Orders/Overview/Block7';
// import Block8 from 'src/content/Orders/Overview/Block8';
import RecentOrders from '@/content/Orders/Overview/RecentOrders';

function DashboardExpensesContent() {
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
          <Block1 />
        </Grid>
        <Grid item xs={12}>
          <Block2 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Block4 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Block5 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Block6 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Block7 />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardExpensesContent;
