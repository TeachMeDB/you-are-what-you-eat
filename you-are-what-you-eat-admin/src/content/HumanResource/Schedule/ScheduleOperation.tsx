


import HowToRegIcon from '@mui/icons-material/HowToReg';


import { useState } from 'react';
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

} from '@mui/material';
import { formatDistance, subMinutes, subHours } from 'date-fns';
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



export function CustomDay() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
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




const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
];



function ScheduleOperation() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Software Developer'
  };

  const [state, setState] = useState({
    invisible: true
  });


  const [currency, setCurrency] = useState('EUR');


  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
    setCurrency(event.target.value);
  };

  return (
    <RootWrapper>

      <CardHeader title={<Typography variant="h3"><EventNoteIcon />  筛选排班周表</Typography>} />

      <CardHeader title="筛选日期" />
      <Divider />
      <CardContent>

        <CustomDay />
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
          <div>
            <TextField
              id="select-place"
              select
              label="工作地点"
              value={currency}
              onChange={handleChange}
              helperText="请筛选地点"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="select-occupation"
              select
              label="职位"
              value={currency}
              onChange={handleChange}
              helperText="请筛选职位"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </div>
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
              value={currency}
              onChange={handleChange}
              helperText="请填写排班星期"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="select-place"
              select
              label="起始时间"
              value={currency}
              onChange={handleChange}
              helperText="请填写起始时间"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="select-occupation"
              select
              label="终止时间"
              value={currency}
              onChange={handleChange}
              helperText="请填写终止时间"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
            <Tooltip arrow title="View profile for Remy Sharp">
              <Avatar
                sx={{
                  width: 28,
                  height: 28
                }}
                component={Link}
                href="#"
                alt="Remy Sharp"
                src="/static/images/avatars/1.jpg"
              />
            </Tooltip>
            <Tooltip arrow title="View profile for Travis Howard">
              <Avatar
                sx={{
                  width: 28,
                  height: 28
                }}
                component={Link}
                href="#"
                alt="Travis Howard"
                src="/static/images/avatars/2.jpg"
              />
            </Tooltip>
            <Tooltip arrow title="View profile for Craig Vaccaro">
              <Avatar
                sx={{
                  width: 28,
                  height: 28
                }}
                component={Link}
                href="#"
                alt="Craig Vaccaro"
                src="/static/images/avatars/3.jpg"
              />
            </Tooltip>
          </AvatarGroup>

          <Button variant="contained" size="large">
            确认排班
          </Button>
        </Box>
      </MeetingBox>


    </RootWrapper>
  );
}

export default ScheduleOperation;
