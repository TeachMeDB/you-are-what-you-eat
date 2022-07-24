import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';

import { useState, ChangeEvent, ReactChild, ReactFragment, ReactPortal } from 'react';

import ProfileCover from '@/content/HumanResource/Organization/Profile/ProfileCover';
import QuickLink from '@/content/HumanResource/Organization/Profile/QuickLink';
import Stuff from '@/content/HumanResource/Organization/Profile/stuff';
import Summary from '@/content/HumanResource/Organization/Profile/Summary';

import SelfManagementTab from '@/content/HumanResource/Organization/SelfManagementTab';
import SalaryManagementTab from '@/content/HumanResource/Organization/SalaryManagementTab';
import PrizeManagementTab from '@/content/HumanResource/Organization/PrizeManagementTab';
import EmployeeManagementTab from '@/content/HumanResource/Organization/EmployeeManagementTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function Organization() {

  const [currentTab, setCurrentTab] = useState<string>('SelfManagementTab');

  const tabs = [
    { value: 'SelfManagementTab', label: '个人档案管理' },
    { value: 'EmployeeManagementTab', label: '员工信息管理' },
    { value: 'SalaryManagementTab', label: '员工薪资管理' },
    { value: 'PrizeManagementTab', label: '员工奖金管理' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title> 组织管理</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover />
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stuff />
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickLink />
          </Grid>
        </Grid>

      </Container>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'SelfManagementTab' && <SelfManagementTab />}
            {currentTab === 'SalaryManagementTab' && <SalaryManagementTab />}
            {currentTab === 'PrizeManagementTab' && <PrizeManagementTab />}
            {currentTab === 'EmployeeManagementTab' && <EmployeeManagementTab />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Organization.getLayout = (page: boolean | ReactChild | ReactFragment | ReactPortal) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Organization;
