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
import { useRefMounted } from '@/hooks/useRefMounted';
import { EmployeeDetail } from '@/models/employee';
import { humanResourceApi } from '@/queries/employee';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);




const init_id:string="1001";

const initial_employee:EmployeeDetail={
  "id": "78",
  "name": "定其选南火",
  "gender": "男",
  "occupation": "经理",
  "birthday": "2001-09-01",
  "attends": [
    {
      "time_start": "2008-08-19 00:03:18",
      "time_end": "1991-09-07 03:38:19",
      "place": "esse do dolore minim",
      "plan_id": "61",
      "attendance": false
    },
    {
      "time_start": "2009-01-18 09:14:35",
      "time_end": "2016-07-31 00:49:49",
      "place": "deserunt",
      "plan_id": "83",
      "attendance": true
    },
    {
      "time_start": "2005-09-07 17:54:39",
      "time_end": "2007-02-14 07:57:50",
      "place": "veniam",
      "plan_id": "94",
      "attendance": false
    },
    {
      "time_start": "2008-03-31 11:37:56",
      "time_end": "1989-08-24 09:07:23",
      "place": "labore",
      "plan_id": "17",
      "attendance": false
    }
  ],
  "payrolls": [
    {
      "pay_datetime": "1993-12-16 01:33:39",
      "amount": 53
    },
    {
      "pay_datetime": "2004-02-27 03:49:49",
      "amount": 99
    },
    {
      "pay_datetime": "1976-02-22 21:37:43",
      "amount": 51
    },
    {
      "pay_datetime": "2017-01-27 06:40:16",
      "amount": 54
    }
  ],
  "prizes": [
    {
      "prize_datetime": "2018-01-13 17:49:03",
      "level": "do",
      "amount": 98
    }
  ],
  "avatar": "http://dummyimage.com/100x100",
  "cover": "ullamco Ut"
}

function Organization() {

  const isMountedRef = useRefMounted();
  const [user, setUser] = useState<EmployeeDetail>(initial_employee);

  const getUser = useCallback(async () => {
    try {
      const response = await humanResourceApi.getEmployeeDetail(init_id);

      if (isMountedRef()) {
        setUser(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUser();
  }, [getUser]);


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
            <Stuff  user={user}/>
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
            {user.occupation==='经理'&&currentTab === 'SalaryManagementTab' && <SalaryManagementTab  user={user}/>}
            {user.occupation==='经理'&&currentTab === 'PrizeManagementTab' && <PrizeManagementTab  user={user}/>}
            {user.occupation==='经理'&&currentTab === 'EmployeeManagementTab' && <EmployeeManagementTab  user={user}/>}
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
