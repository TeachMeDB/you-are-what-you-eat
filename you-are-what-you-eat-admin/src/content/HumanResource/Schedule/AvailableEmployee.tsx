
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
  useTheme
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';


import { useState, MouseEvent, ChangeEvent } from 'react';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EmployeeSchedule from './EmployeeSchedulePopup';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0.5)};
        //background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
  `
);




export interface StuffMember {
  /**
   * 本月出勤率
   */
  attendance_rate: number;
  /**
   * 头像url
   */
  avatar: string;
  /**
   * 获奖次数
   */
  award_times: number;
  gender: string;
  id: string;
  name: string;
  occupation: string;
}





function AvailableEmployee() {


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


  const employees: StuffMember[] = [
    {
      "id": "43",
      "name": "机每面以利",
      "gender": "男",
      "occupation": "ex amet culpa",
      "attendance_rate": 66,
      "award_times": 1267057860920,
      "avatar": "http://dummyimage.com/100x100"
    },
    {
      "id": "42",
      "name": "引更龙接成真",
      "gender": "男",
      "occupation": "voluptate esse",
      "attendance_rate": 90,
      "award_times": 1107224790631,
      "avatar": "http://dummyimage.com/100x100"
    },
    {
      "id": "35",
      "name": "于政有",
      "gender": "女",
      "occupation": "do ut",
      "attendance_rate": 61,
      "award_times": 1213420216522,
      "avatar": "http://dummyimage.com/100x100"
    },
    {
      "id": "29",
      "name": "进对包",
      "gender": "女",
      "occupation": "velit",
      "attendance_rate": 89,
      "award_times": 1132758112786,
      "avatar": "http://dummyimage.com/100x100"
    }
  ]

  return (
    <RootWrapper>
      <Card>
        <CardHeader title={<Typography variant="h3"><GroupAddIcon />  当前筛选下可排班人员表列</Typography>} />
        <Divider />
        <Box p={2}>
          <Grid container spacing={0}>
            {employees.map((stuff: StuffMember) => (
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
                      {stuff.occupation}
                    </Typography>
                  </Box>

                </Box>
                <Box p={1.5}>
                  <Grid container direction="row" xs={12}>

                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddTwoToneIcon />}
                      >
                        添加到待班表列
                      </Button>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                      <EmployeeSchedule/>
                    </Grid>
                  </Grid>


                </Box>

                <Box p={2}></Box>

              </Grid>
            ))}
          </Grid>

          <Box p={2}>
            <TablePagination
              component="p"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>


        </Box>
      </Card>
    </RootWrapper>
  );
};


export default AvailableEmployee;
