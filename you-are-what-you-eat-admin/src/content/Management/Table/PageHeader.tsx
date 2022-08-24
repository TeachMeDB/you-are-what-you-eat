import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AssignSeat from './AssignSeat';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          场地管理
        </Typography>
        <Typography variant="subtitle2">
          查看餐厅场地状态，管理座位
        </Typography>
      </Grid>
      <Grid item>{<AssignSeat />}</Grid>
    </Grid>
  );
}

export default PageHeader;
