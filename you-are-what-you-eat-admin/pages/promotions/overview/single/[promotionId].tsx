import Head from 'next/head';

import { useRouter } from 'next/router';

import { useState, useCallback, useEffect } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { Promotion } from 'src/models/promotion';

import PromotionBody from '@/content/Promotions/Overview/single/PromotionBody';
import PageHeader from 'src/content/Promotions/Overview/single/PageHeader';
import { promotionsApi } from '@/queries/promotions';

function SinglePromotionView() {
  const isMountedRef = useRefMounted();

  const router = useRouter();

  const { promotionId } = router.query;
  // console.log(promotionId);

  const [promotion, setPrmotion] = useState<Promotion | null>({
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

  if (!promotion) {
    return null;
  }

  return (
    <>
      <Head>
        <title>促销活动详情</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader promotion={promotion} />
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
          <PromotionBody promotion={promotion} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

SinglePromotionView.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default SinglePromotionView;
