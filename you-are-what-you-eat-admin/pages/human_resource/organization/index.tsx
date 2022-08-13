import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';

import { useState, ChangeEvent, ReactChild, ReactFragment, ReactPortal, useCallback, useEffect } from 'react';

import ProfileCover from '@/content/HumanResource/Organization/Profile/ProfileCover';
import QuickLink from '@/content/HumanResource/Organization/Profile/QuickLink';
import Stuff from '@/content/HumanResource/Organization/Profile/Stuff';
import Summary from '@/content/HumanResource/Organization/Profile/Summary';

import SelfManagementTab from '@/content/HumanResource/Organization/SelfManagementTab';
import SalaryManagementTab from '@/content/HumanResource/Organization/SalaryManagementTab';
import PrizeManagementTab from '@/content/HumanResource/Organization/PrizeManagementTab';
import EmployeeManagementTab from '@/content/HumanResource/Organization/EmployeeManagementTab';
import { EmployeeDetail, EmployeeEntity } from '@/models/employee';
import { humanResourceApi } from '@/queries/employee';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

const init_id:string="1001";


function Organization( {user,employees} :{ user:EmployeeDetail,employees:EmployeeEntity[] }) {

  const [currentTab, setCurrentTab] = useState<string>('SelfManagementTab');

  const tabs = [
    { value: 'SelfManagementTab', label: '个人档案管理' }].concat(user.occupation==='经理'? 
    [{ value: 'EmployeeManagementTab', label: '员工信息管理' },
    { value: 'SalaryManagementTab', label: '员工薪资管理' },
    { value: 'PrizeManagementTab', label: '员工奖金管理' }]:[]);

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
            <ProfileCover user={user}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary  user={user}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stuff  user={user} employees={employees.filter((employee:EmployeeEntity)=>{
            return employee.occupation===user.occupation;
          })}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickLink  user={user}/>
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
            {currentTab === 'SelfManagementTab' && <SelfManagementTab  user={user}/>}
            {user.occupation==='经理'&&currentTab === 'SalaryManagementTab' && <SalaryManagementTab/>}
            {user.occupation==='经理'&&currentTab === 'PrizeManagementTab' && <PrizeManagementTab/>}
            {user.occupation==='经理'&&currentTab === 'EmployeeManagementTab' && <EmployeeManagementTab/>}
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



export async function getServerSideProps() {

  const user = await humanResourceApi.getEmployeeDetail(init_id);

  const employees = await humanResourceApi.getEmployees();

  return { props: { user,employees } }
}
