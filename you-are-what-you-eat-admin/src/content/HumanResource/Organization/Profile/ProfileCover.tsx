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
import { useRefMounted } from '@/hooks/useRefMounted';
import { useCallback, useEffect, useState } from 'react';
import { humanResourceApi } from '@/queries/employee';
import { EmployeeDetail } from '@/models/employee';


import { differenceInYears, format, formatDistance, formatRelative, subDays } from 'date-fns'

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



const ProfileCover = ({user}:{user:EmployeeDetail}) => {

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
          员工出生日期 ： {user.birthday} | 年龄 ： {differenceInYears(Date.now(),Date.parse(user.birthday))}岁
        </Typography>

        <Grid spacing={3} direction="column">

          <Box
            display={{ xs: 'block', md: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
            <Button size="small" variant="contained">
                职位：{user.occupation}
              </Button>
              
              <Button size="small" sx={{ mx: 1 }} variant="outlined">
              性别：{user.gender}
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
