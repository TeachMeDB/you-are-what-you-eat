import { useState, useEffect, useCallback } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';

import Head from 'next/head';
import PageHeader from 'src/content/Promotions/Overview/PageHeader';
import Footer from 'src/components/Footer';
import Statistics from 'src/content/Promotions/Overview/Statistics';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';
// import { useRefMounted } from 'src/hooks/useRefMounted';
// import type { Invoice } from 'src/models/invoice';
// import { invoicesApi } from 'src/mocks/invoices';
import Results from 'src/content/Promotions/Overview/Results';
import { PromotionStatus } from '@/models/promotion';

function ManagementInvoices() {
//   const isMountedRef = useRefMounted();
  const [invoices, setInvoices] = useState/*<Invoice[]>*/([
    {
      id: "1",
      name: "疯狂星期四",
      start: new Date(),
      end: new Date(),
      description: "疯狂星期四",
      dishes: [],
      status: "completed" as PromotionStatus
  },
  {
    id: "2",
    name: "疯狂星期四",
    start: new Date(),
    end: new Date(),
    description: "疯狂星期四",
    dishes: [],
    status: "running" as PromotionStatus
},
{
  id: "3",
  name: "疯狂星期四",
  start: new Date(),
  end: new Date(),
  description: "疯狂星期四",
  dishes: [],
  status: "ready" as PromotionStatus
}
  ]);

//   const getInvoices = useCallback(async () => {
//     try {
//       const response = await invoicesApi.getInvoices();

//       if (isMountedRef()) {
//         setInvoices(response);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMountedRef]);

//   useEffect(() => {
//     getInvoices();
//   }, [getInvoices]);

  return (
    <>
      <Head>
        <title>Invoices - Management</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Statistics />
        </Grid>
        <Grid item xs={12}>
          <Results promotions={invoices} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementInvoices.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementInvoices;
