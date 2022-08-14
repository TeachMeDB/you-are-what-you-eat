import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Asset/Overview/PageHeader';
import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import AllAssetInfoes from '@/content/Asset/Overview/AssetInfo';
import { queryAssetApi } from '@/queries/query_asset';
import { queryEmployeeApi } from '@/queries/query_employee';
import { useState } from 'react';
import AllManageInfo from '@/content/Asset/Manage/ManageInfo';
import { queryManageApi } from '@/queries/query_manage';

function assetOverview({ list = [], manageList = [], employees = [] }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [assetInfoes, setAssetInfoes] = useState(list);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [manageInfoes, setManageInfoes] = useState(manageList);
  return (
    <>
      <Head>
        <title>资产信息</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          employees={employees}
          assets={assetInfoes}
          setAssetInfoes={setAssetInfoes}
          setManageInfoes={setManageInfoes}
          currentTab={1}
        />
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
            <AllAssetInfoes
              list={assetInfoes || []}
              employees={employees || []}
              setAssetInfoes={setAssetInfoes}
            />
          </Grid>
        </Grid>
      </Container>
      <PageTitleWrapper>
        <PageHeader
          employees={employees}
          assets={assetInfoes}
          setAssetInfoes={setAssetInfoes}
          setManageInfoes={setManageInfoes}
          currentTab={2}
        />
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
            <AllManageInfo
              list={manageInfoes || []}
              assets={assetInfoes || []}
              employees={employees || []}
              setManageInfoes={setManageInfoes}
            />
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

export async function getServerSideProps() {
  const assetInfoes = await queryAssetApi.getAssetList('');
  const manageList = await queryManageApi.getManageList();
  const employees = await queryEmployeeApi.getEmployeeList();
  return {
    props: {
      list: assetInfoes || [],
      manageList: manageList || [],
      employees: employees || [],
    }, // will be passed to the page component as props
  };
}

export default assetOverview;
