import PageHeader from 'src/content/Energy/Overview/PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';

import { Grid } from '@mui/material';

import EnergyPanel from '@/content/Energy/Overview/EnergyPanel';
import EnergySurplus from '@/content/Energy/Overview/EnergySurplus';
import Block4 from 'src/content/Energy/Overview/Block4';
import OverallUsage from 'src/content/Energy/Overview/OverallUsage';
import TypesOverview from '@/content/Energy/Overview/EnergyTypesOverview';
import EnergyPieChart from '@/content/Energy/Overview/EnergyPieChart';
import RecordDownload from '@/content/Energy/Overview/RecordDownloader';

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
          <EnergyPanel />
        </Grid>
        <Grid item md={6} xs={12}>
          <OverallUsage />
        </Grid>
        <Grid item md={6} xs={12}>
          <TypesOverview />
        </Grid>
        <Grid item md={6} xs={12}>
          <EnergySurplus />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block4 />
        </Grid>
        <Grid item md={6} xs={12}>
          <EnergyPieChart />
        </Grid>
        <Grid item md={6} xs={12}>
          <RecordDownload />
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
