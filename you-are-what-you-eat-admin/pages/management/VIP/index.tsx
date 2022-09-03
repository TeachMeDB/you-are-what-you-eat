import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/VIP/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import VIPPage from '@/content/Management/VIP/VIPPage';

function ApplicationsVIP() {
  return (
    <>
      <Head>
        <title>VIP - Applications</title>
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
            <VIPPage />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsVIP.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ApplicationsVIP;
