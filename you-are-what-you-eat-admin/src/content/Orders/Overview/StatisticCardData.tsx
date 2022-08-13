import {
  Typography,
  Box,
  Avatar,
  Card,
  Grid,
  useTheme,
  styled
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import YardTwoToneIcon from '@mui/icons-material/YardTwoTone';

import type { DailyOrderStatic } from '@/models/order';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        color:  ${theme.colors.alpha.trueWhite[100]};
        width: ${theme.spacing(5.5)};
        height: ${theme.spacing(5.5)};
  `
);

function StatisticCardData(dailyOrderStatic: DailyOrderStatic) {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            background: `${theme.colors.gradients.blue4}`
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.blue2}`
              }}
            >
              <ReceiptTwoToneIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                color: `${theme.colors.alpha.trueWhite[70]}`,
                fontWeight: 'bold'
              }}
              variant="subtitle2"
              component="div"
            >
              {t('今日订单量')}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center'
            }}
          >
            {dailyOrderStatic.order_num_change > dailyOrderStatic.order_num ? (
              <ArrowDownwardTwoToneIcon
                sx={{
                  color: `${theme.colors.error.main}`
                }}
              />
            ) : (
              <ArrowUpwardTwoToneIcon
                sx={{
                  color: `${theme.colors.success.main}`
                }}
              />
            )}
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`,
                color: `${theme.colors.alpha.trueWhite[100]}`
              }}
              variant="h1"
            >
              {dailyOrderStatic.order_num}
            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            sx={{
              color: `${theme.colors.alpha.trueWhite[50]}`
            }}
            component="div"
          >
            昨日： <b>{`${dailyOrderStatic.order_num_change}`}</b>
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            background: `${theme.colors.gradients.blue3}`
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.orange1}`
              }}
            >
              <SupportTwoToneIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                color: `${theme.colors.alpha.trueWhite[70]}`,
                fontWeight: 'bold'
              }}
              variant="subtitle2"
              component="div"
            >
              {t('今日单品销量')}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center'
            }}
          >
            {dailyOrderStatic.dish_order_num_change >
            dailyOrderStatic.dish_order_num ? (
              <ArrowDownwardTwoToneIcon
                sx={{
                  color: `${theme.colors.error.main}`
                }}
              />
            ) : (
              <ArrowUpwardTwoToneIcon
                sx={{
                  color: `${theme.colors.success.main}`
                }}
              />
            )}
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`,
                color: `${theme.colors.alpha.trueWhite[100]}`
              }}
              variant="h1"
            >
              {dailyOrderStatic.dish_order_num}
            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            sx={{
              color: `${theme.colors.alpha.trueWhite[50]}`
            }}
            component="div"
          >
            昨日： <b>{`${dailyOrderStatic.dish_order_num_change}`}</b>
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            background: `${theme.colors.gradients.purple3}`
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.green1}`
              }}
            >
              <YardTwoToneIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                color: `${theme.colors.alpha.trueWhite[70]}`,
                fontWeight: 'bold'
              }}
              variant="subtitle2"
              component="div"
            >
              {t('今日营业额')}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center'
            }}
          >
            {dailyOrderStatic.turnover_change > dailyOrderStatic.turnover ? (
              <ArrowDownwardTwoToneIcon
                sx={{
                  color: `${theme.colors.error.main}`
                }}
              />
            ) : (
              <ArrowUpwardTwoToneIcon
                sx={{
                  color: `${theme.colors.success.main}`
                }}
              />
            )}
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`,
                color: `${theme.colors.alpha.trueWhite[100]}`
              }}
              variant="h1"
            >
              ￥{dailyOrderStatic.turnover}
            </Typography>
          </Box>
          <Typography
            align="center"
            variant="body2"
            sx={{
              color: `${theme.colors.alpha.trueWhite[50]}`
            }}
            component="div"
          >
            昨日： ￥<b>{`${dailyOrderStatic.turnover_change}`}</b>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}

export default StatisticCardData;
