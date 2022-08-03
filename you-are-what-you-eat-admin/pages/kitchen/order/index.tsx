import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Grid, Container, Card, Box } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';

import PageHeader from '@/content/Kitchen/Order/PageHeader';
import CheckList from '@/content/Kitchen/Order/CheckList';
import CurOrder from '@/content/Kitchen/Order/CurOrder';


import { curOrderApi } from '@/queries/cur_order';

function curOrder(curorder) {

    return (
        <>
            <Head>
                <title>当前订单</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>

            <Container maxWidth="lg">

                <CurOrder curorders={curorder} />

            </Container>



        </>
    )
}

curOrder.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);


export default curOrder;

export async function getServerSideProps() {

    const curorder = await curOrderApi.getCurOrder();
    return { props: { curorder } }
}