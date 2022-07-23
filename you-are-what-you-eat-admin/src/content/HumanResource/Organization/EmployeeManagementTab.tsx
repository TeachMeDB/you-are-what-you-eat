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
  MenuItem
} from '@mui/material';


import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { StuffMember } from './Profile/stuff';


export interface Level {
  amount: number;
  /**
   * 当前职位人数
   */
  count:      number;
  occupation: string;
}



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


function EmployeeManagementTab() {
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


  const levels:Level[]=[
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


  const employees:StuffMember[]=[
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">级别管理</Typography>
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
                {levels.map((level:Level) => (
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
          <Typography variant="h3">添加新员工</Typography>
          <Typography variant="subtitle2">
            添加员工
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
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                  />
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                  />
                  <TextField
                    id="outlined-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="filled"
                  />
                  <TextField
                    disabled
                    id="filled-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="filled"
                  />
                  <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                  />
                  <TextField
                    id="filled-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                      readOnly: true
                    }}
                    variant="filled"
                  />
                  <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="filled"
                  />
                  <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                  />
                  <TextField
                    id="filled-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    variant="filled"
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="standard-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="standard"
                  />
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="standard"
                  />
                  <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                  />
                  <TextField
                    id="standard-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                      readOnly: true
                    }}
                    variant="standard"
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="standard"
                  />
                  <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="standard"
                  />
                  <TextField
                    id="standard-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    variant="standard"
                  />
                </div>
              </Box>
            </ListItem>
            <Divider component="li" />
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
                      id="outlined-select-currency"
                      select
                      label="Select"
                      value={currency}
                      onChange={handleChange}
                      helperText="Please select your currency"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency-native"
                      select
                      label="Native select"
                      value={currency}
                      onChange={handleChange}
                      SelectProps={{
                        native: true
                      }}
                      helperText="Please select your currency"
                    >
                      {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                  <div>
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Select"
                      value={currency}
                      onChange={handleChange}
                      helperText="Please select your currency"
                      variant="filled"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="filled-select-currency-native"
                      select
                      label="Native select"
                      value={currency}
                      onChange={handleChange}
                      SelectProps={{
                        native: true
                      }}
                      helperText="Please select your currency"
                      variant="filled"
                    >
                      {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                  <div>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Select"
                      value={currency}
                      onChange={handleChange}
                      helperText="Please select your currency"
                      variant="standard"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="standard-select-currency-native"
                      select
                      label="Native select"
                      value={currency}
                      onChange={handleChange}
                      SelectProps={{
                        native: true
                      }}
                      helperText="Please select your currency"
                      variant="standard"
                    >
                      {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                </Box>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}>
      <Box pb={2}>
          <Typography variant="h3">全体员工</Typography>
          <Typography variant="subtitle2">
            管理员工信息
          </Typography>
        </Box>

        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="员工信息"
            subheader="点击查看员工详细信息"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>员工号</TableCell>
                  <TableCell>员工头像</TableCell>
                  <TableCell>员工名</TableCell>
                  <TableCell>员工性别</TableCell>
                  <TableCell>员工职位</TableCell>
                  <TableCell>出勤率</TableCell>
                  <TableCell>获奖次数</TableCell>
                  <TableCell align="right">删除操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>
                      <Avatar src={employee.avatar} />
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.gender}</TableCell>
                    <TableCell>{employee.occupation}</TableCell>
                    <TableCell>{employee.attendance_rate}</TableCell>
                    <TableCell>{employee.award_times}</TableCell>
                    <TableCell align="right">
                      <Tooltip placement="top" title="Delete" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
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

export default EmployeeManagementTab;
