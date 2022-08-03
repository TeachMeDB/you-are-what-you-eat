import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Asset/Overview/PageHeader';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import AllAssetInfoes from '@/content/Asset/Overview/AssetInfo';
import { queryAssetApi } from '@/queries/query_asset';
import { queryEmployeeApi } from '@/queries/query_employee';

function assetOverview({ list, employees }) {
  return (
    <>
      <Head>
        <title>资产信息</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader employees={employees} />
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
            <AllAssetInfoes list={list} employees={employees} />
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

export async function getServerSideProps(context) {
  console.log(context, ' <-- context');
  const data = await queryAssetApi.getAssetList('');
  const employees = await queryEmployeeApi.getEmployeeList();
  return {
    props: {
      list: data || [],
      employees,
    }, // will be passed to the page component as props
  }
}

export default assetOverview;
