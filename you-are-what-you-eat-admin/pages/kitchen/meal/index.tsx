import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Kitchen/Meal/PageHeader';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import AllMealInfoes from '@/content/Kitchen/Meal/MealInfo';

import { mealInfoApi } from '@/queries/meal';

function mealInfo(mealinfo) {
    return (
        <>
            <Head>
                <title>菜品信息</title>
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
                        <AllMealInfoes />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

mealInfo.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);




export default mealInfo;

export async function getServerSideProps() {

    const mealinfo = await mealInfoApi.getMealInfo();
    return { props: { mealinfo } }
}
