
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button,
  lighten,
  styled,
  TablePagination,
  useTheme,
  Stack
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import RemoveIcon from '@mui/icons-material/Remove';


import { useState, MouseEvent, ChangeEvent, useCallback, useEffect } from 'react';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EmployeeSchedule from './EmployeeSchedulePopup';
import { useRefMounted } from '@/hooks/useRefMounted';
import { Avaliable} from '@/models/schedule';
import { scheduleApi } from '@/queries/schedule';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0.5)};
        //background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
  `
);


function AvailableEmployee({startTime,endTime,place,occupation,handleSelectPeople}:{
  startTime:string,
  endTime:string,
  place:string,
  occupation:string,
  handleSelectPeople:(value:Avaliable[])=>void
}) {

  const [selected,setSelected]=useState<Avaliable[]>([]);

  const isMountedRef = useRefMounted();
  const [availables, setAvailables] = useState<Avaliable[]>([]);

  const getAllData = useCallback(async () => {


    console.log("avaliable request:",place,occupation,startTime,endTime);

    try {

      let available = await scheduleApi.getAvailable(startTime,endTime,place,occupation);

      if (isMountedRef()) {
        setAvailables(available);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllData();
  }, [startTime,endTime,place,occupation,getAllData]);



  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <RootWrapper>
      <Card>
        <CardHeader title={<Typography variant="h3"><GroupAddIcon />  当前筛选下可排班人员表列</Typography>} />
        <Divider />
        <Box p={2}>
          <Grid container spacing={0}>

            {(occupation===""||place===""||startTime===""||endTime===""||availables.length===0)&&
              (
              
                <Grid container direction="row" spacing={0}>
                  <Grid xs={12} item>
                    <Typography variant='h2'>请筛选职位和地点</Typography>
                  </Grid>
                  
                   <Grid xs={12} item>
                   
                   </Grid>
                   <Grid xs={12} item>
                   <img alt="404" height={520} src="/static/images/status/maintenance.svg"/>
                   </Grid>
                 
              
                </Grid>)
            }
          
            {(occupation!=""&&place!=""&&startTime!=""&&endTime!=""&&availables.length>0)&&(availables.map((stuff: Avaliable) =>{
              return (
              <Grid key={stuff.id} item xs={12} sm={6} lg={4}>
                <Box p={1.5} display="flex" alignItems="flex-start">
                  <Avatar src={stuff.avatar} />
                  <Box pl={2}>
                    <Typography gutterBottom variant="subtitle2">
                      {stuff.id}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {stuff.name}
                    </Typography>
                    <Typography color="text.primary" sx={{ pb: 2 }}>
                      {stuff.gender}
                    </Typography>
                  </Box>

                </Box>
                <Box p={1.5}>
                  <Grid container direction="row">

                    <Grid item xs={6}>
                      {
                        (!selected.find((person)=> person.id===stuff.id)) && (
                          <Button
                            onClick={(): void => {

                              if(!selected.find((person)=> person.id===stuff.id))
                              {
                                let another=selected.concat([
                                  {
                                    id:stuff.id,
                                    name:stuff.name,
                                    gender:stuff.gender,
                                    avatar:stuff.avatar
                                  }] as Avaliable[]);

                                setSelected(another);
      
                                handleSelectPeople(another);

                              }
                              
                            }} 
                            variant="outlined"
                            size="small"
                            startIcon={<AddTwoToneIcon />
                          }
                          >
                            添加待排
                          </Button>
                        )
                      }

                      {
                        (selected.find((person)=> person.id===stuff.id)) && (
                          <Button
                            onClick={(): void => {

                              if(selected.find((person)=> person.id===stuff.id))
                              {
                                let another=selected.filter((person)=>person.id!=stuff.id);

                                setSelected(another);
      
                                handleSelectPeople(another);

                              }
                              
                            }} 
                            variant="contained"
                            size="small"
                            startIcon={<RemoveIcon />}
                          >
                            移除待排
                          </Button>
                        )
                      }
                      
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                      <EmployeeSchedule person={stuff} week={new Date(startTime)}/>
                    </Grid>
                  </Grid>


                </Box>

                <Box p={2}></Box>

              </Grid>
            );}))}
          </Grid>

          {(occupation!=""&&place!=""&&availables.length>0)&&(<Box p={2}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>)}


        </Box>
      </Card>
    </RootWrapper>
  );
};


export default AvailableEmployee;
