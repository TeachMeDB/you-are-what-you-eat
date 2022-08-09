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
import ProfileCover from '../Profile/ProfileCover';
import Summary from '../Profile/Summary';
import { defaultUser, EmployeeDetail, EmployeeEntity } from '@/models/employee';
import { useRefMounted } from '@/hooks/useRefMounted';
import { humanResourceApi } from '@/queries/employee';
import { scheduleApi } from '@/queries/schedule';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailEmployeePopup({userId}:{userId:string}) {



  const isMountedRef = useRefMounted();
  const [employee, setEmployee] = React.useState<EmployeeDetail>(defaultUser);

  const getAllData = React.useCallback(async () => {
    try {


      let person = await humanResourceApi.getEmployeeDetail(userId);

      if (isMountedRef()) {
        setEmployee(person);
        
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    getAllData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} size="large">
        查看
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
              员工详情界面
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose} size="large">
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
            <ProfileCover user={employee}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary user={employee} />
          </Grid>
        </Grid>

      </Container>
      </Dialog>
    </div>
  );
}
