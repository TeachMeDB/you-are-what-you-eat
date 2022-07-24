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
import AddBoxIcon from '@mui/icons-material/AddBox';

import BadgeIcon from '@mui/icons-material/Badge';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';



import AddCircleIcon from '@mui/icons-material/AddCircle';
export interface Level {
  amount: number;
  /**
   * 当前职位人数
   */
  count: number;
  occupation: string;
}


export interface Prize {
  amount: number;
  id:     string;
  level:  string;
  name:   string;
  time:   string;
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



const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: ${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    // position: relative;

    .MuiCardMedia-root {
      width: ${theme.spacing(40)};
      height: ${theme.spacing(20)};

    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    // position: absolute;
    // right: ${theme.spacing(2)};
    // bottom: ${theme.spacing(2)};
`
);




// const currencies = [
//   {
//     value: 'USD',
//     label: '$'
//   },
//   {
//     value: 'EUR',
//     label: '€'
//   },
//   {
//     value: 'BTC',
//     label: '฿'
//   },
//   {
//     value: 'JPY',
//     label: '¥'
//   }
// ];


function PrizeManagementTab() {

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


  const prizes:Prize[]=[
    {
      "id": "43",
      "level": "Ut ex Excepteur",
      "time": "1994-11-06 04:47:43",
      "amount": 69,
      "name": "我用织直证太"
    },
    {
      "id": "65",
      "level": "Ut amet elit qui deserunt",
      "time": "2015-03-27 04:06:29",
      "amount": 64,
      "name": "精成院写具"
    },
    {
      "id": "93",
      "level": "non Excepteur",
      "time": "1996-05-29 21:27:55",
      "amount": 26,
      "name": "法关素天"
    },
    {
      "id": "35",
      "level": "ullamco aliquip fugiat",
      "time": "2012-03-29 18:57:23",
      "amount": 46,
      "name": "把须社土"
    }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">奖励管理</Typography>
          <Typography variant="subtitle2">
            餐厅员工奖励级别如下所示
          </Typography>
        </Box>

        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="员工奖励表"
            subheader="奖励等级如下所示"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>等级</TableCell>
                  <TableCell>金额</TableCell>
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
          <Typography variant="h3">添加新奖励等级</Typography>
          <Typography variant="subtitle2">
            添加奖励等级
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
                    label="奖励名"
                  />
                  <TextField
                    required
                    id="amount"
                    label="金额"
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
          <Typography variant="h3">添加新奖励发放记录</Typography>
          <Typography variant="subtitle2">
            添加奖励发放记录
          </Typography>
        </Box>
        <Card>
          <List>

            <ListItem sx={{ p: 3 }}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' }
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
                    required
                    id="occupation"
                    label="奖励名"
                  />
                  <TextField
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
          <Typography variant="h3">奖金发放记录</Typography>
          <Typography variant="subtitle2">
            查询奖金发放记录
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
                  <TableCell>奖励等级</TableCell>
                  <TableCell>发放时间</TableCell>
                  <TableCell>发放金额</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prizes.map((prize) => (
                  <TableRow key={prize.id} hover>
                    <TableCell>{prize.id}</TableCell>
                    <TableCell>{prize.name}</TableCell>
                    <TableCell>{prize.level}</TableCell>
                    <TableCell>{prize.time}</TableCell>
                    <TableCell>{prize.amount}</TableCell>
                    
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



export default PrizeManagementTab;
