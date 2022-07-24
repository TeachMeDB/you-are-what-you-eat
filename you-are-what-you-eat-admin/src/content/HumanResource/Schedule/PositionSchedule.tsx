import { Box, lighten, Card, CardHeader, Divider, styled, Typography } from '@mui/material';

import Schedule from '@/components/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';


const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0.5)};
        //background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
  `
);

function PositionSchedule() {

  return (
    <RootWrapper>
      <Card>

        <CardHeader title={<Typography variant="h3"><EventAvailableIcon />  选中排班表</Typography>} />
        <Divider />
        <Schedule />


      </Card>

    </RootWrapper>
  );
}

export default PositionSchedule;
