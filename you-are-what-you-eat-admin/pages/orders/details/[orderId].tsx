import Head from 'next/head';

import { useState, useCallback, useEffect } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { OrderDetail } from '@/models/order';

import OrderDetailBody from '@/content/Orders/Details/OrderDetailBody';
import PageHeader from 'src/content/Orders/Details/PageHeader';

import { ordersApi } from 'src/queries/orders';

function OrderDetailView({ orderId }: { orderId }) {
  const isMountedRef = useRefMounted();

  console.log('order id: ', orderId.orderId);
  
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

  const getOrderDetail = useCallback(async () => {
    try {
      const response = await ordersApi.getOrderDetail(orderId.orderId as string);

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
          <OrderDetailBody detail={orderDetail} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

OrderDetailView.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export async function getServerSideProps(context) {
  const orderId = context.query;

  return { props: { orderId } }
}

export default OrderDetailView;
