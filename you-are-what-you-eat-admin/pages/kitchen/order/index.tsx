import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Grid, Container, Card, Box } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';

import PageHeader from '@/content/Kitchen/Order/PageHeader';
import CheckList from '@/content/Kitchen/Order/CheckList';
import CurOrder from '@/content/Kitchen/Order/CurOrder';


function mealInfo() {
    return (
        <>
            <Head>
                <title>菜品信息</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>

            <Container maxWidth="lg">

                <CurOrder />

            </Container>



        </>
    )
}

mealInfo.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);


export default mealInfo;