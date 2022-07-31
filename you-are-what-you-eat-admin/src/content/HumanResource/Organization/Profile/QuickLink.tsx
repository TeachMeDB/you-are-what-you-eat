import { EmployeeDetail } from '@/models/employee';
import {
    Typography,
    Card,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListSubheader,
    ListItemText,
    Avatar,
    useTheme,
    styled
} from '@mui/material';

const ListWrapper = styled(List)(
    () => `
        .MuiListItem-root {
          border-radius: 0;
          margin: 0;
        }
  `
);

function QuickLink({user}:{user:EmployeeDetail}) {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader title="快速访问" />
            <Divider />
            <ListWrapper disablePadding>
                <ListItem
                    sx={{
                        color: `${theme.colors.primary.main}`,
                        '&:hover': { color: `${theme.colors.primary.dark}` }
                    }}
                    button
                >
                    <ListItemText primary="到时候来点人社局" />
                </ListItem>
                <Divider />
                <ListItem
                    sx={{
                        color: `${theme.colors.primary.main}`,
                        '&:hover': { color: `${theme.colors.primary.dark}` }
                    }}
                    button
                >
                    <ListItemText primary="什么饿了吗" />
                </ListItem>
                <Divider />
                <ListItem
                    sx={{
                        color: `${theme.colors.primary.main}`,
                        '&:hover': { color: `${theme.colors.primary.dark}` }
                    }}
                    button
                >
                    <ListItemText primary="大众点评" />
                </ListItem>
                <Divider />
                <ListItem
                    sx={{
                        color: `${theme.colors.primary.main}`,
                        '&:hover': { color: `${theme.colors.primary.dark}` }
                    }}
                    button
                >
                    <ListItemText primary="之类的跳转" />
                </ListItem>
                <Divider />
                <ListSubheader>
                    <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
                        收藏夹
                    </Typography>
                </ListSubheader>
                <Divider />
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                width: 38,
                                height: 38,
                                background: `${theme.colors.info.main}`,
                                color: `${theme.palette.info.contrastText}`
                            }}
                        >
                            WD
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: 'h5',
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="自定义路由"
                    />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                width: 38,
                                height: 38,
                                background: `${theme.colors.alpha.black[100]}`,
                                color: `${theme.colors.alpha.white[100]}`
                            }}
                        >
                            D
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: 'h5',
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="自定义路由"
                    />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar
                            sx={{ width: 38, height: 38 }}
                            src="/static/images/logo/google.svg"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: 'h5',
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="自定义路由"
                    />
                </ListItem>
            </ListWrapper>
        </Card>
    );
}

export default QuickLink;
