import { useRefMounted } from '@/hooks/useRefMounted';
import { EmployeeDetail, EmployeeEntity } from '@/models/employee';
import { humanResourceApi } from '@/queries/employee';
import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    Grid,
    TablePagination
} from '@mui/material';


import { useState, MouseEvent, ChangeEvent, useCallback, useEffect } from 'react';




const initial_employees:EmployeeEntity[] = [
    {
      "id": "82",
      "name": "学给机问达",
      "gender": "男",
      "occupation": "enim proident sint dolore ut",
      "birthday": "2000-01-01",
      "attendance_rate": 13,
      "award_times": 328770130185,
      "avatar": "http://dummyimage.com/100x100"
    },
    {
      "id": "95",
      "name": "果务系共产报交",
      "gender": "男",
      "occupation": "esse",
      "birthday": "2002-04-01",
      "attendance_rate": 52,
      "award_times": 1458028243810,
      "avatar": "http://dummyimage.com/100x100"
    }
];



function Stuff({user}) {


  const isMountedRef = useRefMounted();
  const [employees, setEmployees] = useState<EmployeeEntity[]>(initial_employees);

  const getEmployees = useCallback(async () => {
    try {
      const response = await humanResourceApi.getEmployees();

      if (isMountedRef()) {
        setEmployees(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);


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
        <Card>
            <CardHeader title="同职位同事" />
            <Divider />
            <Box p={2}>
                <Grid container spacing={0}>
                    {employees.map((stuff:StuffMember) => (
                        <Grid key={stuff.id} item xs={12} sm={6} lg={4}>
                            <Box p={3} display="flex" alignItems="flex-start">
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
                        </Grid>
                    ))}
                </Grid>
            </Box>
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
        </Card>
    );
}

export default Stuff;
