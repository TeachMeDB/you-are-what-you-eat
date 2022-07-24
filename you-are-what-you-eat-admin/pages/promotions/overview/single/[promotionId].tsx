import Head from 'next/head';

import { useRouter } from 'next/router';

import { useState, useCallback, useEffect } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { Promotion } from 'src/models/promotion';

import InvoiceBody from 'src/content/Promotions/Overview/single/InvoiceBody';
import PageHeader from 'src/content/Promotions/Overview/single/PageHeader';
import { promotionsApi } from '@/queries/promotions';

function ManagementInvoicesView() {
  const isMountedRef = useRefMounted();

  const router = useRouter();

  const { promotionId } = router.query;
  // console.log(promotionId);

  const [prmotion, setPrmotion] = useState<Promotion | null>({
    id: '1',
    name: '',
    start: new Date(),
    end:   new Date(),
    description: '',
    dishes:  [],
    status: 'running'
});

  const getPromotion = useCallback(async () => {
    try {
      const response = await promotionsApi.getPromotionById(promotionId as string);

      if (isMountedRef()) {
        setPrmotion(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPromotion();
  }, [getPromotion]);

  if (!prmotion) {
    return null;
  }

  return (
    <>
      <Head>
        <title>促销活动详情</title>
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
