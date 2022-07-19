import PageHeader from 'src/content/Dashboards/Orders/PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';

import Block1 from 'src/content/Dashboards/Orders/Block1';
import Block2 from 'src/content/Dashboards/Orders/Block2';
import Block3 from 'src/content/Dashboards/Orders/Block3';
import Block4 from 'src/content/Dashboards/Orders/Block4';
import Block5 from 'src/content/Dashboards/Orders/Block5';
import Block6 from 'src/content/Dashboards/Orders/Block6';
import Block7 from 'src/content/Dashboards/Orders/Block7';
import Block8 from 'src/content/Dashboards/Orders/Block8';

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
          <Block1 />
        </Grid>
        <Grid item xs={12}>
          <Block2 />
        </Grid>
        <Grid item xs={12}>
          <Block3 />
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
        <Grid item xs={12}>
          <Block8 />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardExpensesContent;
