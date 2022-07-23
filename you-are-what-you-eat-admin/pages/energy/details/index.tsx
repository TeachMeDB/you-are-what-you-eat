import PageHeader from 'src/content/Energy/Overview/PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';

import { Grid } from '@mui/material';

import AudienceOverview from '@/content/Energy/Details/AudienceOverview';

function DataDisplayChartsLarge() {

  return (
    <>
      <Head>
        <title>Charts Large Blocks</title>
      </Head>
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
          <AudienceOverview />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

DataDisplayChartsLarge.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default DataDisplayChartsLarge;
