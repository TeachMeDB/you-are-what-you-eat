import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    useTheme,
    styled
} from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { EmployeeDetail, Prize } from '@/models/employee';

const AvatarPrimary = styled(Avatar)(
    ({ theme }) => `
    background: ${theme.colors.primary.lighter};
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);


function Summary({user}:{user:EmployeeDetail}) {


    const theme = useTheme();

    return (
        <Card>
            <CardHeader title="个人信息统计" />
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <WorkIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h3">出勤</Typography>

                    <Box pt={2} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                本月排班日
                            </Typography>
                            <Typography variant="h2">{user.attends.length}</Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                出勤率
                            </Typography>
                            <Typography variant="h2">{user.attends.filter((value)=>{return value.attendance===true}).length}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <MonetizationOnIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h3">薪资</Typography>

                    <Box pt={2} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                薪资金额
                            </Typography>
                            <Typography variant="h2">{user.payrolls[0].amount}</Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                最近发薪日
                            </Typography>
                            <Typography variant="h4">{user.payrolls[0].pay_datetime.split(' ')[0]}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <EmojiEventsIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h3">奖金</Typography>

                    <Box pt={2} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                奖金累计
                            </Typography>
                            <Typography variant="h2">{
                                user.prizes.length>0?
                                user.prizes.reduce((pre,cur)=>{
                                    let prize:Prize={
                                        amount: pre.amount+cur.amount,
                                        level:"yaya",
                                        prize_datetime:"2021"
                                    };
                                    return prize;
                                }).amount :0
                                }
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                获奖次数
                            </Typography>
                            <Typography variant="h2">{user.prizes.length}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}

export default Summary;