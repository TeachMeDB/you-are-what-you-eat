import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';

import OrderOverview from 'src/content/OrderPages/overview';

function DashboardExpenses() {
  return (
    <>
      <Head>
        <title>订单管理</title>
      </Head>
      <OrderOverview />
    </>
  );
}

DashboardExpenses.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default DashboardExpenses;
