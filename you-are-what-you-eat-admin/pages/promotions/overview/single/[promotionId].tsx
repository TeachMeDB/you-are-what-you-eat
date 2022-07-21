import Head from 'next/head';

import { useState, useCallback, useEffect } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';
// import { useRefMounted } from 'src/hooks/useRefMounted';
import type { Promotion } from 'src/models/promotion';
// import { invoicesApi } from 'src/mocks/invoices';

import InvoiceBody from 'src/content/Promotions/Overview/single/InvoiceBody';
import PageHeader from 'src/content/Promotions/Overview/single/PageHeader';

function ManagementInvoicesView() {
//   const isMountedRef = useRefMounted();
  const [prmotion, setInvoice] = useState<Promotion | null>({
    id: '1',
    name: 'ffff',
    start: new Date(),
    end:   new Date(),
    description: 'dddd',
    dishes:  [],
    status: 'running'
});

//   const getInvoice = useCallback(async () => {
//     try {
//       const response = await invoicesApi.getInvoice();

//       if (isMountedRef()) {
//         setInvoice(response);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMountedRef]);

//   useEffect(() => {
//     getInvoice();
//   }, [getInvoice]);

  if (!prmotion) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Invoice Details - Management</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader promotion={prmotion} />
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
          <InvoiceBody promotion={prmotion} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

ManagementInvoicesView.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementInvoicesView;
