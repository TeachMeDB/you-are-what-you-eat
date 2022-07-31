import { Fragment } from 'react';

import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  Card,
  Button,
  Typography,
  Avatar,
  styled,
  ListItem,
  useTheme,
  Tooltip
} from '@mui/material';
import Scrollbar from 'src/components/Scrollbar';

import { useTranslation } from 'react-i18next';
import Text from 'src/components/Text';
import type { ActiveVIP } from '@/models/order';

const DotLegend = styled('span')(
  ({ theme }) => `
      border-radius: 22px;
      width: 10px;
      height: 10px;
      display: inline-block;
      margin-right: ${theme.spacing(0.5)};
  `
);

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root:last-of-type + .MuiDivider-root {
          display: none;
      }
  `
);

function ActiveVIPData(data: ActiveVIP[]) {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Box>
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{
              fontSize: `${theme.typography.pxToRem(12)}`
            }}
          >
            {t('Active VIP')}
          </Typography>
          <Typography variant="h4">{t('活跃会员')}</Typography>
        </Box>
      </Box>
      <Divider />
      <Divider />
      <Box
        sx={{
          height: 300
        }}
      >
        <Scrollbar>
          <ListWrapper disablePadding>
            {data.map((vip) => (
              <Fragment key={vip.username}>
                <ListItem
                  sx={{
                    '&:hover': {
                      background: `${theme.colors.alpha.black[5]}`
                    }
                  }}
                  secondaryAction={
                    <>
                    <Tooltip
                    title={vip.order_num}
                    >
                    <Button
                      size="small"
                      variant="text"
                      color="secondary"
                      sx={{
                        alignSelf: 'center',
                        padding: `${theme.spacing(0.5, 1.6, 0.5, 1.2)}`,
                        backgroundColor: `${theme.colors.secondary.lighter}`,
                        textTransform: 'uppercase',
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        '&:hover': {
                          backgroundColor: `${theme.colors.secondary.main}`,
                          color: `${theme.palette.getContrastText(
                            theme.colors.secondary.main
                          )}`
                        }
                      }}
                    >
                      {t('最近订单数')}
                    </Button>
                    </Tooltip>
                    <Tooltip
                    title={vip.order_credit}
                    >
                    <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    sx={{
                      alignSelf: 'center',
                      padding: `${theme.spacing(0.5, 1.6, 0.5, 1.2)}`,
                      backgroundColor: `${theme.colors.secondary.lighter}`,
                      textTransform: 'uppercase',
                      fontSize: `${theme.typography.pxToRem(11)}`,
                      '&:hover': {
                        backgroundColor: `${theme.colors.secondary.main}`,
                        color: `${theme.palette.getContrastText(
                          theme.colors.secondary.main
                        )}`
                      }
                    }}
                  >
                    {t('最近消费金额')}
                  </Button>
                  </Tooltip>
                  </>
                  }
                >
                  <ListItemAvatar
                    sx={{
                      mr: 1
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50
                      }}
                      alt={vip.username}
                      src={vip.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      flexGrow: 0,
                      maxWidth: '50%',
                      flexBasis: '50%'
                    }}
                    disableTypography
                    primary={
                      <Typography
                        sx={{
                          pb: 0.6
                        }}
                        color="text.primary"
                        variant="h5"
                      >
                        {vip.username}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Box display="flex" alignItems="flex-start">
                          <DotLegend
                            style={{
                              background: `${theme.colors.success.main}`
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: `${theme.typography.pxToRem(11)}`,
                              lineHeight: 1
                            }}
                            variant="body1"
                          >
                            <Text color="success">{t('常来')}</Text>
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </ListWrapper>
        </Scrollbar>
      </Box>
      <Divider />
    </Card>
  );
}

export default ActiveVIPData;
