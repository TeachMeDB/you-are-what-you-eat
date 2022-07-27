import { Card, CardHeader, Divider } from '@mui/material';

import Schedule from '@/components/Schedule';

import EventAvailableIcon from '@mui/icons-material/EventAvailable';


import PageviewIcon from '@mui/icons-material/Pageview';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Container, Grid } from '@mui/material';
import ProfileCover from '../Organization/Profile/ProfileCover';
import Summary from '../Organization/Profile/Summary';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmployeeSchedule() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PageviewIcon/>}
        onClick={handleClickOpen}
      >
        查看日程
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              size='large'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 4, flex: 1 }} variant="h2" component="div">
              员工详情时间表界面
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose} size="large">
              保存
            </Button>
          </Toolbar>
        </AppBar>
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
        
        <Grid item ></Grid>
          


        </Grid>

        <Card>

        <CardHeader title={<Typography variant="h3"><EventAvailableIcon />  选中排班表</Typography>} />
        <Divider />
        <Schedule />


        </Card>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
        
        <Grid item ></Grid>
          


        </Grid>


      </Container>


      

      
      </Dialog>
    </div>
  );
}
