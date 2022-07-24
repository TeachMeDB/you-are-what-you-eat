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

const AvatarPrimary = styled(Avatar)(
    ({ theme }) => `
    background: ${theme.colors.primary.lighter};
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);




export abstract class Employee {
    attends: Attend[];
    /**
     * 头像url
     */
    avatar: string;
    cover: string;
    gender: string;
    id: string;
    name: string;
    occupation: string;
    payrolls: Payroll[];
    prizes: Prize[];
}

export interface Attend {
    /**
     * 是否出勤
     */
    attendance: boolean;
    place: string;
    plan_id: string;
    time_end: string;
    time_start: string;
}

export interface Payroll {
    amount: number;
    pay_datetime: string;
}

export interface Prize {
    amount: number;
    level: string;
    prize_datetime: string;
}


function Summary() {
    const theme = useTheme();


    const user: Employee = {
        "id": "28",
        "name": "子节说两需提图",
        "gender": "女",
        "occupation": "ipsum amet",
        "attends": [
          {
            "time_start": "2002-09-16 19:27:12",
            "time_end": "1975-10-11 04:06:43",
            "place": "proident cupidatat",
            "plan_id": "71",
            "attendance": false
          },
          {
            "time_start": "2017-08-18 01:36:38",
            "time_end": "2020-10-02 11:22:59",
            "place": "dolor in anim magna",
            "plan_id": "82",
            "attendance": false
          },
          {
            "time_start": "1970-10-12 06:42:31",
            "time_end": "1980-10-01 12:00:09",
            "place": "aliquip eiusmod ipsum",
            "plan_id": "49",
            "attendance": false
          }
        ],
        "payrolls": [
          {
            "pay_datetime": "2012-04-22 04:23:42",
            "amount": 11
          },
          {
            "pay_datetime": "1974-10-21 21:58:50",
            "amount": 96
          },
          {
            "pay_datetime": "1974-12-14 04:40:27",
            "amount": 42
          }
        ],
        "prizes": [
          {
            "prize_datetime": "1971-04-08 13:20:53",
            "level": "consectetur officia",
            "amount": 73
          },
          {
            "prize_datetime": "2020-04-06 11:07:37",
            "level": "ut exercitation sunt est",
            "amount": 12
          },
          {
            "prize_datetime": "2018-03-25 15:27:09",
            "level": "anim eiusmod esse",
            "amount": 38
          }
        ],
        "avatar": "http://dummyimage.com/100x100",
        "cover": "ea"
      };

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
                            <Typography variant="h2">{user.prizes.reduce((pre,cur)=>{
                                    let prize:Prize={
                                        amount: pre.amount+cur.amount,
                                        level:"yaya",
                                        prize_datetime:"2021"
                                    };
                                    return prize;
                                }).amount}
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
