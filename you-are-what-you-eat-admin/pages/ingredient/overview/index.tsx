import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Ingredient/Overview/PageHeader';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import AllIngredientInfoes from '@/content/Ingredient/Overview/IngredientInfo';

function ingredientOverview() {
  return (
    <>
      <Head>
        <title>耗材信息</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
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
            <AllIngredientInfoes />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ingredientOverview.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ingredientOverview;
