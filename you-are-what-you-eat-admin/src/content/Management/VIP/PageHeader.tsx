import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SignUpVip from './SignUpVip';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          会员管理
        </Typography>
        <Typography variant="subtitle2">
          查看并管理全部会员信息
        </Typography>
      </Grid>
      <Grid item>{<SignUpVip />}</Grid>
    </Grid>
  );
}

export default PageHeader;
