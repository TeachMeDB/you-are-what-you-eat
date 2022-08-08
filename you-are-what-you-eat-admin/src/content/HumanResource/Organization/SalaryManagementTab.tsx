import { useState, MouseEvent, ChangeEvent, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  Divider,
  Button,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  TextField,
} from '@mui/material';



import AddBoxIcon from '@mui/icons-material/AddBox';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRefMounted } from '@/hooks/useRefMounted';
import { PayrollEntity, PayrollUpload, Salary } from '@/models/employee';
import { salaryApi } from '@/queries/salary';
import { format } from 'date-fns'
import { awardApi } from '@/queries/award';




function SalaryManagementTab() {


  const isMountedRef = useRefMounted();
  const [payrolls, setPayrolls] = useState<PayrollEntity[]>([]);
  const [levels,setLevels]=useState<Salary[]>([]);

  const getAllData = useCallback(async () => {
    try {
      let payrolls = await salaryApi.getPayroll();

      let levels=await salaryApi.getSalary();


      if (isMountedRef()) {
        setPayrolls(payrolls);
        setLevels(levels);
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




  const [upload,setUpload]=useState<PayrollUpload>({
    id:"",
    time:format(Date.now(),"yyyy-MM-dd HH:mm-ss")
  } as PayrollUpload
  )


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
                  
                  <TableCell>人数</TableCell>
                  <TableCell>薪资</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levels.map((level: Salary) => (
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


      {/* <Grid item xs={12}>
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
      </Grid> */}

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
                    value={upload.id}
                    onChange={(event)=>{
                     let upload={
                        id:event.target.value,
                        time: format(Date.now(),"yyyy-MM-dd HH:mm-ss")
                      } as PayrollUpload;
                      setUpload(upload);
                    }}
                  />
                  <TextField
                    disabled
                    id="outlined-disabled"
                    value={format(Date.now(),"yyyy-MM-dd HH:mm-ss")}
                  />
                
                </div>
              </Box>
              <Grid item xs={3} textAlign="end">
                <Button variant="contained" size="large"
                onClick={()=>{


                  const conduct=async ()=>{

                    return await salaryApi.postPayroll(upload);

                  }

                  conduct().then((value)=>{


                    alert("添加成功："+ value);

                    window.location.reload();

                  }).catch((value)=>{

                    alert("添加失败："+value);


                  })



                }}>
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
                {payrolls.slice((page)*rowsPerPage,(page+1)*rowsPerPage).map((payroll) => (
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
              count={payrolls.length}
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
