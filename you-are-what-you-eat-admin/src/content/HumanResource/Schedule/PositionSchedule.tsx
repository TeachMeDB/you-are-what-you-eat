import { Box, lighten, Card, CardHeader, Divider, styled, Typography } from '@mui/material';

import Schedule from '@/components/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useRefMounted } from '@/hooks/useRefMounted';
import { useState, useCallback, useEffect } from 'react';
import { ScheduleEntity } from '@/models/schedule';
import { scheduleApi } from '@/queries/schedule';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import ScheduleDelete from '@/components/ScheduleDelete';


const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0.5)};
        //background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
  `
);



function PositionSchedule({place,occupation,week}:{place:string,occupation:string,week:Date}) {


  const isMountedRef = useRefMounted();
  const [schedules, setSchedules] = useState<ScheduleEntity[]>([]);

  const getAllData = useCallback(async () => {

    

    let weekStart=startOfWeek(week);
    let weekEnd=endOfWeek(week);

    console.log("this is asking a whole schedule:")
    console.log(place,occupation,weekStart,weekEnd)

    try {

      let schedules = await scheduleApi.getSchedule(format(weekStart,"yyyy-MM-dd HH:mm:ss"),format(weekEnd,"yyyy-MM-dd HH:mm:ss"),null,place,occupation);

      if (isMountedRef()) {
        setSchedules(schedules);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllData();
  }, [week,place,occupation,getAllData]);


  return (
    <RootWrapper>
      <Card>

        <CardHeader title={<Typography variant="h3"><EventAvailableIcon />  选中排班表</Typography>} />
        <Divider />
        <ScheduleDelete schedules={schedules}/>


      </Card>

    </RootWrapper>
  );
}

export default PositionSchedule;
