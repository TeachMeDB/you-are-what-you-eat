import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';

import DashboardExpensesContent from 'src/content/DashboardPages/orders';

function DashboardExpenses() {
  return (
    <>
      <Head>
        <title>Expenses Dashboard</title>
      </Head>
      <DashboardExpensesContent />
    </>
  );
}

DashboardExpenses.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default DashboardExpenses;
