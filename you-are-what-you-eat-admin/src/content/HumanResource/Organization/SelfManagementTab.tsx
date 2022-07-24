import {
  Box,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  IconButton,
  Button,
  CardActions,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';



import WarningIcon from '@mui/icons-material/Warning';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';



const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);


function SelfManagementTab() {
  return (
    <Card>
      <List>
        <ListItem sx={{ p: 3 }}>
          <ListItemAvatar sx={{ pr: 2 }}>
            <AvatarSuccess>
              <WarningAmberIcon />
            </AvatarSuccess>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
            secondaryTypographyProps={{
              variant: 'subtitle2',
              lineHeight: 1
            }}
            primary="更新重要信息"
            secondary="更新姓名、性别等重要信息"
          />
          <ButtonError size="large" variant="contained">
            更新
          </ButtonError>
        </ListItem>
        <Divider component="li" />
        <ListItem sx={{ p: 3 }}>
          <ListItemAvatar sx={{ pr: 2 }}>
            <AvatarSuccess>
              <WarningIcon />
            </AvatarSuccess>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
            secondaryTypographyProps={{
              variant: 'subtitle2',
              lineHeight: 1
            }}
            primary="删除档案"
            secondary="相关资料会被一起删除"
          />
          <ButtonError size="large" variant="contained">
            删除
          </ButtonError>
        </ListItem>
      </List>
    </Card>
  );
}

export default SelfManagementTab;
