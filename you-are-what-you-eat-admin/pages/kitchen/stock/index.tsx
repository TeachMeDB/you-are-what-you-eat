import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Kitchen/Stock/PageHeader';
import AllStockInfoes from '@/content/Kitchen/Stock/StockInfo';


function stockInfo() {


    return (
        <>

            <Head>
                <title>库存信息</title>
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
                        <AllStockInfoes />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

stockInfo.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);


export default stockInfo;


