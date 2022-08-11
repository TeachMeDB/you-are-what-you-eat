import { useState, useEffect, useCallback } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';

import Head from 'next/head';
import PageHeader from 'src/content/Promotions/Overview/PageHeader';
import Footer from 'src/components/Footer';
import Statistics from 'src/content/Promotions/Overview/Statistics';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { Promotion } from 'src/models/promotion';
import { promotionsApi } from 'src/queries/promotions';
import Results from 'src/content/Promotions/Overview/Results';

function PromotionCard() {
  const isMountedRef = useRefMounted();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const getPromotions = useCallback(async () => {
    try {
      const response = await promotionsApi.getAllPromotion();

      if (isMountedRef()) {
        setPromotions(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPromotions();
  }, [getPromotions, refresh]);

  var runningNumber = 0;
  var completedNumber = 0;
  var readyNumber = 0;

  promotions.forEach((promotion) => {
    if (promotion.status === 'completed') completedNumber += 1;
    else if (promotion.status === 'ready') readyNumber += 1;
    else runningNumber += 1;
  });

  return (
    <>
      <Head>
        <title>促销活动管理</title>
      </Head>
      <PageTitleWrapper>{PageHeader(refresh, setRefresh)}</PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          {Statistics(runningNumber, completedNumber, readyNumber)}
        </Grid>
        <Grid item xs={12}>
          <Results promotions={promotions} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

PromotionCard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default PromotionCard;
