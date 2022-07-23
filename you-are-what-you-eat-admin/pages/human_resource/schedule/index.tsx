import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Grid, Container} from '@mui/material';


import { useState } from 'react';



import {
  Box,
  styled,
  Divider,
  Drawer,
  useTheme
} from '@mui/material';

import PositionSchedule from '@/content/HumanResource/Schedule/PositionSchedule';
import ScheduleOperation from '@/content/HumanResource/Schedule/ScheduleOperation';
import AvailableEmployee from '@/content/HumanResource/Schedule/AvailableEmployee';

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);


const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
);



function ManagementUserProfile() {


  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <>
      <Head>
        <title>排班管理</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
        </Grid>
      </Container>
      <RootWrapper className="Mui-FixedWrapper">
        <DrawerWrapperMobile
          sx={{
            display: { lg: 'none', xs: 'inline-block' }
          }}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >

            <ScheduleOperation/>
            
        </DrawerWrapperMobile>

        <Sidebar
          sx={{
            display: { xs: 'none', lg: 'inline-block' }
          }}
        >
          <ScheduleOperation/>
        </Sidebar>

        <Grid
          direction="column"
          justifyContent="center"
          spacing={3}>

          <PositionSchedule/>
          <Divider/>
          <AvailableEmployee/>

        </Grid>

      </RootWrapper>
    
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
