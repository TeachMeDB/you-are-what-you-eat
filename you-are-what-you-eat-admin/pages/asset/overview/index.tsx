import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Asset/Overview/PageHeader';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import AllAssetInfoes from '@/content/Asset/Overview/AssetInfo';

function assetOverview() {
  return (
    <>
      <Head>
        <title>资产信息</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <AllAssetInfoes />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

assetOverview.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default assetOverview;
