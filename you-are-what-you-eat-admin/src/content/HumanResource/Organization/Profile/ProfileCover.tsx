import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

import BadgeIcon from '@mui/icons-material/Badge';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
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

const ProfileCover = () => {


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
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="个人信息">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <BadgeIcon/>
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            员工信息 ：{user.id}
          </Typography>
          <Typography variant="subtitle2">
            员工个人信息、常用人事信息、数据统计、管理界面
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={user.cover} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              更改封面
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.name}
        </Typography>

        <Typography variant="subtitle2">

            这里应该有一段非常大的话这里应该有一段非常大的话这里应该有一段非常大的话这里应该有一段非常大的话这里应该有一段非常大的话这里应该有一段非常大的话这里应该有一段非常大的话这里应该有一段非常大的话这里应该有一段非常大的话
            等完了我找个每日一句贴上去
        </Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          来点啥 | 来点啥 | 来点啥
        </Typography>

        <Grid spacing={3} direction="column">

          <Box
            display={{ xs: 'block', md: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Button size="small" variant="contained">
                {user.occupation}
              </Button>
              <Button size="small" sx={{ mx: 1 }} variant="outlined">
              {user.gender}
              </Button>
            </Box>
          </Box>

        </Grid>
        
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
};

export default ProfileCover;
