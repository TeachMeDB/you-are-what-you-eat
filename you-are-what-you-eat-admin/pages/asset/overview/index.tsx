import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Asset/Overview/PageHeader';
import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import AllAssetInfoes from '@/content/Asset/Overview/AssetInfo';
import { queryAssetApi } from '@/queries/query_asset';
import { queryEmployeeApi } from '@/queries/query_employee';
import { useCallback, useEffect, useState } from 'react';
import AllManageInfo from '@/content/Asset/Manage/ManageInfo';
import { queryManageApi } from '@/queries/query_manage';
import { useRefMounted } from '@/hooks/useRefMounted';
import { EmployeeInfo } from '@/models/employee_info';

function assetOverview({ list = [], manageList = [] }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [assetInfoes, setAssetInfoes] = useState(list);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [manageInfoes, setManageInfoes] = useState(manageList);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isMountedRef = useRefMounted();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [employees, setEmployees] = useState<EmployeeInfo[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getAllData = useCallback(async () => {
    try {
      const employees = await queryEmployeeApi.getEmployeeList();
      if (isMountedRef()) {
        setEmployees(employees || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAllData();
  }, [getAllData]);

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

assetOverview.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export async function getServerSideProps() {
  const assetInfoes = await queryAssetApi.getAssetList('');
  const manageList = await queryManageApi.getManageList();
  return {
    props: {
      list: assetInfoes || [],
      manageList: manageList || [],
    }, // will be passed to the page component as props
  };
}

export default assetOverview;
