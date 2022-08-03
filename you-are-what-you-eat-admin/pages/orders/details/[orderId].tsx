import Head from 'next/head';

import { useState, useCallback, useEffect } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { OrderDetail } from '@/models/order';

import InvoiceBody from '@/content/Orders/Details/OrderDetailBody';
import PageHeader from 'src/content/Orders/Details/PageHeader';

import { ordersApi } from 'src/queries/orders';

function ManagementInvoicesView() {
  const isMountedRef = useRefMounted();
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

  const getOrderDetail = useCallback(async () => {
    try {
      const response = await ordersApi.getOrderDetail("");

      if (isMountedRef()) {
        setOrderDetail(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOrderDetail();
  }, [getOrderDetail]);

  if (!orderDetail) {
    return null;
  }

  return (
    <>
      <Head>
        <title>订单详情</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader detail={orderDetail} />
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
          <InvoiceBody detail={orderDetail} />
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
