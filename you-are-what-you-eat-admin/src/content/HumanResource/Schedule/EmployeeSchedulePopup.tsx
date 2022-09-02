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
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmployeeSchedule({
  person,
  week
}: {
  person: Avaliable;
  week: Date;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    getAllData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isMountedRef = useRefMounted();
  const [employee, setEmployee] = React.useState<EmployeeDetail>(null);

  const [schedules, setSchedules] = React.useState<ScheduleEntity[]>([]);

  const getAllData = React.useCallback(async () => {
    try {
      let weekStart = startOfWeek(week);
      let weekEnd = endOfWeek(week);

      let employees = await humanResourceApi.getEmployeeDetail(person.id);

      let schedule = await scheduleApi.getSchedule(
        format(weekStart, 'yyyy-MM-dd HH:mm:ss'),
        format(weekEnd, 'yyyy-MM-dd HH:mm:ss'),
        person.id
      );

      if (isMountedRef()) {
        setEmployee(employees);

        setSchedules(schedule);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  return (
    (employee)&&<div key={employee.id}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PageviewIcon />}
        onClick={handleClickOpen}
        fullWidth={true}
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
              size="large"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 4, flex: 1 }} variant="h2" component="div">
              员工详情时间表界面
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleClose}
              size="large"
            >
              关闭
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
              <ProfileCover key={employee.id} user={employee} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Summary user={employee} />
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
            <Grid item></Grid>
          </Grid>

          <Card>
            <CardHeader
              title={
                <Typography variant="h3">
                  <EventAvailableIcon /> 当期排班表
                </Typography>
              }
            />
            <Divider />
            <Schedule schedules={schedules} />
          </Card>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item></Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
