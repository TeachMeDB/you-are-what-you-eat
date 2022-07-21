import { Card, CardHeader, Divider } from '@mui/material';

import Schedule from '@/components/Schedule';

function PositionSchedule() {

  return (
    <Card>
        <CardHeader title="Position Schedule" />
      <Divider />
      <Schedule/>
    </Card>
  );
}

export default PositionSchedule;
