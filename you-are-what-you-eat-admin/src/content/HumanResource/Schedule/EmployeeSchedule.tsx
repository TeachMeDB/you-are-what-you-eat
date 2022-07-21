import { Card, CardHeader, Divider } from '@mui/material';

import Schedule from '@/components/Schedule';

function EmployeeSchedule() {

  return (
    <Card>
        <CardHeader title="Position Schedule" />
      <Divider />
      <Schedule/>
    </Card>
  );
}

export default EmployeeSchedule;
