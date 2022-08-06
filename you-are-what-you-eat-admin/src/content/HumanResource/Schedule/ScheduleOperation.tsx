


import HowToRegIcon from '@mui/icons-material/HowToReg';


import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  Button,
  Tooltip,
  AvatarGroup,
  ListItemButton,
  styled,
  lighten,
  CardContent,
  Card,
  Divider,
  CardHeader,
  MenuItem,
  Alert,
  Autocomplete,
  Grid,

} from '@mui/material';
import { formatDistance, subMinutes, subHours, addDays, format, parse, compareAsc } from 'date-fns';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import Label from 'src/components/Label';

import Link from 'src/components/Link';



import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';

import EventNoteIcon from '@mui/icons-material/EventNote';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useRefMounted } from '@/hooks/useRefMounted';
import { PayrollEntity, Salary } from '@/models/employee';
import { salaryApi } from '@/queries/salary';
import { scheduleApi } from '@/queries/schedule';
import { Avaliable, ScheduleEntity, ScheduleUpload } from '@/models/schedule';
import { days, times } from '@/components/Schedule';
import { useRouter } from 'next/router';
import { TurnLeft } from '@mui/icons-material';

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;



export function CustomDay({handleSelectWeek}) {


  const [value, setValue] = React.useState<Date | null>(new Date());


  const renderWeekPickerDay = (
    date: Date,
    _selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>,
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={value}
        onChange={(newValue) => {


          setValue(newValue);
          handleSelectWeek(newValue);

          console.log(newValue);


        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}


const MeetingBox = styled(Box)(
  ({ theme }) => `
          background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
          margin: ${theme.spacing(2)} 0;
          border-radius: ${theme.general.borderRadius};
          padding: ${theme.spacing(2)};
    `
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);



function ScheduleOperation({handleSelectStartTime,handleSelectEndTime,handleSelectWeek,handleSelectPlace,handleSelectOccupation,week,people}:
  {
    handleSelectStartTime:(value:string)=>void,
    handleSelectEndTime:(value:string)=>void,
    handleSelectWeek:(value:Date)=>void,
    handleSelectPlace:(value:string)=>void,
    handleSelectOccupation:(value:string)=>void,
    week:Date,
    people:Avaliable[]
  }) {


  const isMountedRef = useRefMounted();

  const [levels,setLevels]=useState<Salary[]>([]);

  const [day,setDay]=useState(0);

  const [start_time,setStartTime]=useState("");

  const [end_time,setEndTime]=useState("");


  const handleDayChange = (event: { target: { value: string; }; }) => {

    let d=parseInt(event.target.value);
    setDay(d);
  };

  const handleStartTimeChange = (event: { target: { value: string; }; }) => {

    setStartTime(event.target.value);

    let start=""

    if((event.target.value)&&event.target.value!=""){
      start = format(addDays(startOfWeek(week),day),"yyyy-MM-dd")+" "+event.target.value;
    }

    handleSelectStartTime(start)
  };

  const handleEndTimeChange = (event: { target: { value: string; }; }) => {

    setEndTime(event.target.value);

    let end="";

    if((event.target.value)&&event.target.value!=""){
      end = format(addDays(startOfWeek(week),day),"yyyy-MM-dd")+" "+event.target.value;
    }

    handleSelectEndTime(end);
  };


  const [schedules, setSchedules] = useState<ScheduleEntity[]>([]);


  const getAllData = React.useCallback(async () => {
    try {

      let levels=await salaryApi.getSalary();

      let schedule = await scheduleApi.getSchedule(null,null,null,null,null);

      if (isMountedRef()) {
        setSchedules(schedule);
        setLevels(levels);
      }


    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);


  useEffect(() => {
    getAllData();
  }, [getAllData]);


  const [place,setPlace]=useState("");


  const handlePlaceChange = (_: any,value: string) => {

    console.log(value)
    setPlace(value);
    handleSelectPlace(value);
  };

  const [occupation,setOccupation]=useState("");
  const handleOccupationChange = (event: { target: { value: string; }; }) => {

    console.log(event.target.value)
    setOccupation(event.target.value);
    handleSelectOccupation(event.target.value);
  };



  const validate=(start:string,end:string)=>{

    if(start===""||end===""){
      return true;
    }


    let from=Date.parse(start_time);
    let to=Date.parse(end_time);

    console.log(from,to)

    return compareAsc(from,to)<0;
  }

  return (
    <RootWrapper>

      <CardHeader title={<Typography variant="h3"><EventNoteIcon />  筛选排班周表</Typography>} />

      <CardHeader title="筛选日期" />
      <Divider />
      <CardContent>

        <CustomDay handleSelectWeek={handleSelectWeek}/>

      </CardContent>


      <CardHeader title="筛选地点与职位" />
      <Divider />
      <CardContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '15ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container>
            <Autocomplete
              id="select-place"
              freeSolo
              options={(schedules.map((schedule) => (schedule.place)).filter((value, index, self) => (value&&self.indexOf(value) === index)))}
              getOptionLabel={(value)=>(value? value:"")}
              value={place}
              onChange={handlePlaceChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="工作地点"
                  helperText="请填写地点"
                  fullWidth={true}
                />)}
            />
            
            <TextField
              id="select-occupation"
              select
              fullWidth={true}
              label="职位"
              value={occupation}
              onChange={handleOccupationChange}
              helperText="请筛选职位"
            >
              <MenuItem key="未指定" value="">
                  未指定
                </MenuItem>
              {levels.map((level) => (level.occupation)).filter((value, index, self) => (self.indexOf(value) === index)).map((occupation)=>(
                <MenuItem key={occupation} value={occupation}>
                  {occupation}
                </MenuItem>
              ))}
            </TextField>

          </Grid>
        </Box>
      </CardContent>


      <Box display="flex" pb={1} mt={4} alignItems="center">
        <InsertInvitationIcon />
        <Typography
          sx={{
            mr: 1
          }}
          variant="h3"
        >
          添加排班
        </Typography>
      </Box>
      <MeetingBox>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="select-occupation"
              select
              label="星期"
              value={day}
              onChange={handleDayChange}
              helperText="请填写排班星期"
            >
              {['星期天','星期一','星期二','星期三','星期四','星期五','星期六'].map((day,index) => {
                return (
                <MenuItem key={index} value={index}>
                  {day}
                </MenuItem>
              )})}
            </TextField>
            <TextField
              id="select-place"
              select
              label="起始时间"
              value={start_time}
              onChange={handleStartTimeChange}
              helperText="请填写起始时间"
            >
              {
              times.filter((value)=>{
                return validate(value,end_time);
              }).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="select-occupation"
              select
              label="终止时间"
              value={end_time}
              onChange={handleEndTimeChange}
              helperText="请填写终止时间"
            >
              {times.filter((value)=>{
                return validate(start_time,value);;
                }).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

          </div>
        </Box>


        <Box py={3} display="flex" alignItems="flex-start">
          <HowToRegIcon />
          <Box pl={1}>
            <Typography
              variant="h4"
              sx={{
                lineHeight: 1
              }}
              color="text.primary"
            >
              请在空闲人员面板中筛选人员
            </Typography>
            <Typography variant="subtitle1">
              筛选完毕后请点击排班
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <AvatarGroup>

            {
              people.map((person)=>{

                return <Tooltip key={person.id} arrow title={"工号: "+person.id+" 姓名: "+person.name}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28
                    }}
                    src={person.avatar}
                  />
                </Tooltip>


              })
            }
          </AvatarGroup>

          <Button
          disabled={occupation==="" || place===""}
          key={occupation+place+start_time+end_time+week.toISOString()+day.toString}
          variant="contained" size="large"
          onClick={()=>{

            let upload={
              employee_ids: people.map((person)=>person.id),
              occupation:   occupation,
              place:        place,
              time_end:     format(addDays(startOfWeek(week),day),"yyyy-MM-dd")+" "+end_time,
              time_start:   format(addDays(startOfWeek(week),day),"yyyy-MM-dd")+" "+start_time
            } as ScheduleUpload;


            const conduct=async ()=>{

              console.log("arranged time:",start_time,end_time);

              return scheduleApi.postSchedule(upload);

            }

            conduct().then((value)=>{

              alert("排班结果："+value+'\n'+upload);

              window.location.reload();


            }).catch((value)=>{

              alert("排班失败："+value);
            });

          }}>
            确认排班
          </Button>
        </Box>
      </MeetingBox>


    </RootWrapper>
  );
}

export default ScheduleOperation;
