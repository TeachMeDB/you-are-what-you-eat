import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Kitchen/Meal/PageHeader';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import AllMealInfoes from '@/content/Kitchen/Meal/MealInfo';

import { mealInfoApi } from '@/queries/meal';


import AllStockInfoes from '@/content/Kitchen/Stock/StockInfo';
import StockPageHeader from '@/content/Kitchen/Stock/PageHeader';
function mealInfo() {

  return (
    <>
      <Grid container spacing={4}>
        <Head>
          <title>菜品及库存信息</title>
        </Head>
        <Grid item xs={12} >
          <PageTitleWrapper>
            <PageHeader />
          </PageTitleWrapper>
        </Grid>

        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={{ xs: 5, md: 3 }}
          >
            <Grid item xs={12} >
              <AllMealInfoes />
            </Grid>

          </Grid>
        </Container>
        <Grid item xs={12} >
          <PageTitleWrapper>
            <StockPageHeader />
          </PageTitleWrapper>
        </Grid>

        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <AllStockInfoes />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Grid>
    </>
  )

}

mealInfo.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;





export default mealInfo;

export async function getServerSideProps() {

  const mealinfo = await mealInfoApi.getMealInfo();
  return { props: { mealinfo } }
}

