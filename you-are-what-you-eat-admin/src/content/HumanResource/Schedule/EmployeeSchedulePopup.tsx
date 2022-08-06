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
import { Avaliable, ScheduleEntity } from '@/models/schedule';
import { EmployeeDetail } from '@/models/employee';
import { useRefMounted } from '@/hooks/useRefMounted';
import { humanResourceApi } from '@/queries/employee';
import { scheduleApi } from '@/queries/schedule';
import { endOfWeek, format, startOfWeek } from 'date-fns';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const defaultUser={
  "id": "78",
  "name": "定其选南火",
  "gender": "男",
  "occupation": "tempor consectetur qui aute ullamco",
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
} as EmployeeDetail;


export default function EmployeeSchedule({person,week}:{person:Avaliable,week:Date}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    getAllData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isMountedRef = useRefMounted();
  const [employee, setEmployee] = React.useState<EmployeeDetail>(defaultUser);

  const [schedules, setSchedules] = React.useState<ScheduleEntity[]>([]);


  const getAllData = React.useCallback(async () => {
    try {


      let weekStart=startOfWeek(week);
      let weekEnd=endOfWeek(week);

      let employees = await humanResourceApi.getEmployeeDetail(person.id);

      let schedule = await scheduleApi.getSchedule(format(weekStart,"yyyy-MM-dd HH:mm:ss"),format(weekEnd,"yyyy-MM-dd HH:mm:ss"),person.id);

      if (isMountedRef()) {
        setEmployee(employees);
        
        setSchedules(schedule);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);


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
            <ProfileCover user={employee}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary user={employee}/>
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
        <Schedule schedules={schedules}/>


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
