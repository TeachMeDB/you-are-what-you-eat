import {
  useState,
  MouseEvent,
  ChangeEvent,
  useCallback,
  useEffect
} from 'react';
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
import { useRefMounted } from '@/hooks/useRefMounted';
import {
  Award,
  AwardUpload,
  EmployeeEntity,
  PrizeEntity,
  PrizeUpload,
  Salary
} from '@/models/employee';
import { humanResourceApi } from '@/queries/employee';
import { salaryApi } from '@/queries/salary';
import { awardApi } from '@/queries/award';
import { ApprovalRounded } from '@mui/icons-material';
import { compareAsc, compareDesc, format, parse } from 'date-fns';

function PrizeManagementTab() {
  const theme = useTheme();

  const isMountedRef = useRefMounted();
  const [prizes, setPrizes] = useState<PrizeEntity[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [employees,setEmployees]=useState<EmployeeEntity[]>(null);

  const getAllData = useCallback(async () => {
    try {
      let prizes = await awardApi.getPrize();

      let awards = await awardApi.getAward();

      let employees_data = await humanResourceApi.getEmployees();

      if (isMountedRef()) {
        setPrizes(prizes);
        setAwards(awards);
        setEmployees(employees_data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const [page, setPage] = useState(0);
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

  const [uploadAward, setUploadAward] = useState<AwardUpload>({
    level: '',
    amount: 0
  });

  const [uploadPrize, setUploadPrize] = useState<PrizeUpload>({
    id: '',
    level: '',
    time: format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">奖励管理</Typography>
          <Typography variant="subtitle2">餐厅员工奖励级别如下所示</Typography>
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
                  <TableCell align="right">删除操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {awards.map((award: Award) => (
                  <TableRow key={award.level} hover>
                    <TableCell>{award.level}</TableCell>
                    <TableCell>{award.amount}</TableCell>
                    <TableCell>{award.summary}</TableCell>
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
                          
                          onClick={() => {

                            const conduct = async () => {
                              return awardApi.deleteAward(award.level);
                            };

                            conduct()
                              .then((value) => {
                                alert('删除结果：' + value + '\n');
                                window.location.reload();
                              })
                              .catch((value) => {
                                alert('删除失败：' + value);
                              });
                          }}
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
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">添加新奖励等级</Typography>
          <Typography variant="subtitle2">添加奖励等级</Typography>
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
                    value={uploadAward.level}
                    onChange={(event) => {
                      setUploadAward({
                        amount: uploadAward.amount,
                        level: event.target.value
                      });
                    }}
                  />
                  <TextField
                    required
                    id="amount"
                    label="金额"
                    value={uploadAward.amount.toString()}
                    onChange={(event) => {
                      setUploadAward({
                        level: uploadAward.level,
                        amount: parseInt(event.target.value)
                      });
                    }}
                  />
                </div>
              </Box>
              <Grid item xs={3} textAlign="end">
                <Button
                  variant="contained"
                  size="large"
                  disabled={!(uploadAward.amount&&uploadAward.level&&uploadAward.level!=""&&uploadAward.amount>0)}
                  onClick={() => {


                    const conduct = async () => {
                      return await awardApi.postAward(uploadAward);
                    };

                    conduct()
                      .then((value) => {
                        alert('添加结果：' + value);
                        window.location.reload();
                      })
                      .catch((value) => {
                        alert('添加失败：' + value);
                      });
                  }}
                >
                  <AddBoxIcon />
                  确认添加
                </Button>
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">添加新奖励发放记录</Typography>
          <Typography variant="subtitle2">添加奖励发放记录</Typography>
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
                    value={uploadPrize.id}
                    onChange={(event) => {
                      setUploadPrize({
                        id: event.target.value,
                        level: uploadPrize.level,
                        time: uploadPrize.time
                      });
                    }}
                  />

                  <TextField
                    required
                    id="occupation"
                    label="奖励名"
                    value={uploadPrize.level}
                    onChange={(event) => {
                      setUploadPrize({
                        id: uploadPrize.id,
                        level: event.target.value,
                        time: uploadPrize.time
                      });
                    }}
                  />
                  <TextField
                    disabled
                    id="outlined-disabled"
                    value={uploadPrize.time}
                  />
                </div>
              </Box>
              <Grid item xs={3} textAlign="end">
                <Button
                  variant="contained"
                  size="large"
                  disabled={!(uploadPrize&&uploadPrize.id!=""&&uploadPrize.level!="")}
                  onClick={() => {

                    if(!employees.find((employee)=>employee.id===uploadPrize.id)){
                      alert("员工ID必须存在");
                      return;
                    }
                    if(!awards.find((award)=>award.level===uploadPrize.level)){
                      alert("奖励等级必须存在");
                      return;
                    }

                    const conduct = async () => {
                      return await awardApi.postPrize(uploadPrize);
                    };

                    conduct()
                      .then((value) => {
                        alert('添加成功：' + value);

                        window.location.reload();
                      })
                      .catch((value) => {
                        alert('添加失败：' + value);
                      });
                  }}
                >
                  <AddCircleIcon /> 确认添加
                </Button>
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">奖金发放记录</Typography>
          <Typography variant="subtitle2">查询奖金发放记录</Typography>
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
                {prizes.sort((a,b)=>{
                return compareDesc(parse(a.time,"yyyy-MM-dd HH:mm:ss",Date.now()),parse(b.time,"yyyy-MM-dd HH:mm:ss",Date.now()));
              })
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((prize) => (
                    <TableRow key={prize.id + prize.time} hover>
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
              count={prizes.length}
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
