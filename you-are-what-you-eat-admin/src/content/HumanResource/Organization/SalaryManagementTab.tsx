import { useState, MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  ListItemAvatar,
  Avatar,
  Switch,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  styled,
  TextField,
  CardContent,
  MenuItem,
  CardMedia
} from '@mui/material';


import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BadgeIcon from '@mui/icons-material/Badge';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import AddBoxIcon from '@mui/icons-material/AddBox';

import AddCircleIcon from '@mui/icons-material/AddCircle';


export interface Level {
  amount: number;
  /**
   * 当前职位人数
   */
  count: number;
  occupation: string;
}




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


export interface Employee {
  /**
   * base64的图片
   */
  avater: string;
  /**
   * base64的图片
   */
  cover: string;
  gender: string;
  name: string;
  occupation: string;
  /**
   * 员工密码
   */
  password: string;
}




export interface Payroll {
  amount:     number;
  id:         string;
  name:       string;
  occupation: string;
  time:       string;
}



function SalaryManagementTab() {
  const theme = useTheme();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };


  const [currency, setCurrency] = useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const levels: Level[] = [
    {
      "occupation": "consectetur quis labore ut",
      "amount": 37,
      "count": 19
    },
    {
      "occupation": "officia esse nulla enim Ut",
      "amount": 49,
      "count": 55
    },
    {
      "occupation": "adipisicing",
      "amount": 8,
      "count": 23
    },
    {
      "occupation": "ut consectetur irure laborum",
      "amount": 17,
      "count": 97
    },
    {
      "occupation": "ea ex",
      "amount": 94,
      "count": 9
    }
  ];


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
  ];

  const payrolls:Payroll[]=[
    {
      "id": "64",
      "name": "少代划离深军",
      "occupation": "dolor consequat ex",
      "time": "2012-06-12 03:02:43",
      "amount": 45
    },
    {
      "id": "35",
      "name": "那起问群外",
      "occupation": "dolore sint do cillum",
      "time": "1982-10-29 11:17:29",
      "amount": 2
    },
    {
      "id": "36",
      "name": "战儿层议",
      "occupation": "sint in cillum ex sit",
      "time": "1999-10-18 21:41:13",
      "amount": 25
    },
    {
      "id": "76",
      "name": "层利难长",
      "occupation": "nulla Duis",
      "time": "2010-04-28 01:37:36",
      "amount": 78
    }
  ];


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">职位管理</Typography>
          <Typography variant="subtitle2">
            餐厅员工职级如下所示
          </Typography>
        </Box>

        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="员工职位表"
            subheader="职位如下所示"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>职位</TableCell>
                  <TableCell>薪资</TableCell>
                  <TableCell>人数</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levels.map((level: Level) => (
                  <TableRow key={level.occupation} hover>
                    <TableCell>{level.occupation}</TableCell>
                    <TableCell>{level.count}</TableCell>
                    <TableCell>{level.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

      </Grid>


      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">添加新员工职位</Typography>
          <Typography variant="subtitle2">
            添加职位级别
          </Typography>
        </Box>
        <Card>
          <List>

            <ListItem sx={{ p: 3 }}>
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
                    required
                    id="occupation"
                    label="职位名"
                  />
                  <TextField
                    required
                    id="amount"
                    label="薪资"
                  />
                </div>

                
                
              </Box>
              <Grid item xs={3} textAlign="end">
                <Button variant="contained" size="large">
                <AddBoxIcon/>确认添加
                </Button>
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">添加薪资发放记录</Typography>
          <Typography variant="subtitle2">
            添加薪资发放记录
          </Typography>
        </Box>
        <Card>
          <List>

            <ListItem sx={{ p: 3 }}>
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
                    required
                    id="id"
                    label="员工号"
                  />
                  <TextField
                    key="gender"
                    disabled
                    id="outlined-disabled"
                    defaultValue={new Date().toISOString()}
                  />
                
                </div>
              </Box>
              <Grid item xs={3} textAlign="end">
                <Button variant="contained" size="large">
                <AddCircleIcon/> 确认添加
                </Button>
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>



      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">薪资发放记录</Typography>
          <Typography variant="subtitle2">
            查薪资发放记录
          </Typography>
        </Box>

        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="奖金发放记录表"
            subheader="点击查看获奖员工详细信息"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>员工号</TableCell>
                  <TableCell>员工名</TableCell>
                  <TableCell>员工职位</TableCell>
                  <TableCell>发放时间</TableCell>
                  <TableCell>发放金额</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payrolls.map((payroll) => (
                  <TableRow key={payroll.id} hover>
                    <TableCell>{payroll.id}</TableCell>
                    <TableCell>{payroll.name}</TableCell>
                    <TableCell>{payroll.occupation}</TableCell>
                    <TableCell>{payroll.time}</TableCell>
                    <TableCell>{payroll.amount}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SalaryManagementTab;
