import { useTranslation } from 'react-i18next';
import Link from 'src/components/Link';
import {
  Box,
  Grid,
  Container,
  Card,
  Avatar,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Typography,
  Divider,
  Button,
  styled,
  CardMedia,
  CardActionArea
} from '@mui/material';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import BestSeller from 'src/content/Overview/Highlights/OrderCover/BestSeller';
import RecentOrders from 'src/content/Overview/Highlights/OrderCover/RecentOrders';
import PromotionDetail from 'src/content/Overview/Highlights/PromotionCover/PromotionDetail';
import VipSummary from './VIPCover/VIPSummary';
import EnergyChart from 'src/content/Overview/Highlights/EnergyCover/EnergyChart';
import TableSummary from './TableCover/TableSummary';

const group = [
  '1950849 李乐天',
  '1951510 姜文渊',
  '1951477 孟  宇',
  '1953824 杨淳屹',
  '1950787 杨  鑫',
  '1951650 戴仁杰',
  '1951138 王铭邦',
  '1953243 杨孟臻',
  '2052717 陈  晨',
  '2056173 何红昌'
]

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
`
);

const TypographyH1Primary = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(36)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const BoxHighlights = styled(Box)(
  () => `
    position: relative;
    z-index: 5;
`
);

const TypographyHeading = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(36)};
`
);

const TypographySubHeading = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const TypographyFeature = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
    color: ${theme.colors.primary.main};
    font-weight: bold;
    margin-bottom: -${theme.spacing(1)};
    display: block;
`
);

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const BoxLayouts = styled(Box)(
  ({ theme }) => `
      background: ${theme.colors.gradients.blue1};
      padding: ${theme.spacing(16, 0)};
      margin: ${theme.spacing(10, 0, 0)};
      position: relative;

      .typo-heading,
      .typo-feature {
        color: ${theme.colors.alpha.trueWhite[100]};
      }

      .typo-subheading {
        color: ${theme.colors.alpha.trueWhite[70]};
      }
`
);

const BoxLayoutsImage = styled(Box)(
  () => `
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
`
);

const BoxLayoutsContent = styled(Container)(
  ({ theme }) => `
      z-index: 5;
      position: relative;
      color: ${theme.colors.alpha.trueWhite[100]};
`
);

const BoxWave = styled(Box)(
  ({ theme }) => `
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    z-index: 5;

    svg path {
	    fill: ${theme.colors.alpha.white[100]};
	}
`
);

const BoxWaveAlt = styled(Box)(
  ({ theme }) => `
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    z-index: 2;

    svg path {
	    fill: ${theme.colors.alpha.white[100]};
	}
`
);

const LayoutImgButton = styled(Link)(
  ({ theme }) => `
    overflow: hidden;
    border-radius: ${theme.general.borderRadiusXl};
    display: block;
    position: relative;
    box-shadow: 0 0rem 14rem 0 rgb(0 0 0 / 20%), 0 0.8rem 2.3rem rgb(0 0 0 / 3%), 0 0.2rem 0.7rem rgb(0 0 0 / 15%);

    .MuiTypography-root {
      position: absolute;
      right: ${theme.spacing(3)};
      bottom: ${theme.spacing(3)};
      color: ${theme.colors.alpha.trueWhite[100]};;
      background: rgba(0,0,0,.8);
      padding: ${theme.spacing(2, 4.5)};
      border-radius: ${theme.general.borderRadiusXl};
      z-index: 5;
    }

    img {
      width: 100%;
      height: auto;
      display: block;
      opacity: 1;
      transition: opacity .2s;
    }

    &:hover {
      img {
        opacity: .8;
      }
    }
`
);

function Highlights() {
  const { t }: { t: any } = useTranslation();

  return (
    <BoxHighlights>
      <BoxLayouts>
        <BoxWave>
          <svg
            viewBox="0 0 1440 172"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H1440V52.1874C1440 52.1874 873.5 172 720 172C566.5 172 0 52.1874 0 52.1874V0Z"
              fill="white"
            />
          </svg>
        </BoxWave>
        <BoxLayoutsImage
          sx={{
            backgroundImage: 'url("/static/images/placeholders/covers/7.jpg")'
          }}
        />
        <BoxLayoutsContent maxWidth="lg">
          <Grid
            justifyContent="center"
            alignItems="center"
            spacing={6}
            container
          >
            <Grid item xs={12} md={6}>
              <TypographyFeature
                className="typo-feature"
                sx={{
                  mt: { lg: 10 }
                }}
              >
                简约而不简单
              </TypographyFeature>
              <TypographyHeading
                className="typo-heading"
                sx={{
                  mb: 1
                }}
                variant="h3"
              >
                {`Move faster with intuitive React.`}
              </TypographyHeading>
              <TypographySubHeading
                className="typo-subheading"
                sx={{
                  lineHeight: 1.5
                }}
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
              >
                {t(
                  '人如其食使用遵循 Google Material Design 的 MUI 这一 React UI 设计框架，提供轻盈、易用、符合直觉的餐厅管理服务。'
                )}
              </TypographySubHeading>
            </Grid>
            <Grid item xs={12} md={6}>
              <LayoutImgButton target="_blank" rel="noopener" href="#">
                <Typography variant="h4">{t('订单管理')}</Typography>
                <img src="/static/cover/order.png" alt="OrderOverview" />
              </LayoutImgButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <LayoutImgButton target="_blank" rel="noopener" href="#">
                <Typography variant="h4">{t('会员管理')}</Typography>
                <img src="/static/cover/VIP.png" alt="VIPManagement" />
              </LayoutImgButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <LayoutImgButton target="_blank" rel="noopener" href="#">
                <Typography variant="h4">{t('促销活动')}</Typography>
                <img src="/static/cover/promotion.png" alt="AddPromotion" />
              </LayoutImgButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <LayoutImgButton target="_blank" rel="noopener" href="#">
                <Typography variant="h4">{t('场地管理')}</Typography>
                <img src="/static/cover/table.png" alt="TableManagement" />
              </LayoutImgButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <LayoutImgButton target="_blank" rel="noopener" href="#">
                <Typography variant="h4">{t('资产保修')}</Typography>
                <img src="/static/cover/map.png" alt="Collapsed Sidebar" />
              </LayoutImgButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <LayoutImgButton target="_blank" rel="noopener" href="#">
                <Typography variant="h4">{t('员工管理')}</Typography>
                <img src="/static/cover/schedule.png" alt="Schedule" />
              </LayoutImgButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <LayoutImgButton target="_blank" rel="noopener" href="#">
                <Typography variant="h4">{t('实时控制')}</Typography>
                <img
                  src="/static/cover/currentOrder.png"
                  alt="Bottom Navigation"
                />
              </LayoutImgButton>
            </Grid>
          </Grid>
        </BoxLayoutsContent>
        <BoxWaveAlt>
          <svg
            viewBox="0 0 1440 172"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1440 172H0V119.813C0 119.813 566.5 0 720 0C873.5 0 1440 119.813 1440 119.813V172Z"
              fill="white"
            />
          </svg>
        </BoxWaveAlt>
      </BoxLayouts>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 8, md: 10 }
        }}
      >
        <Grid
          spacing={0}
          direction={{ xs: 'column-reverse', md: 'row' }}
          justifyContent="center"
          container
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                top: { xs: -50, md: 0 },
                left: { xs: -150, md: -45 },
                minHeight: { xs: 530, md: 1130 },
                transform: { xs: 'scale(.5)', md: 'none' },
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 500,
                  top: -50,
                  left: -30,
                  transform:
                    'translate(0px, 120px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2.1s 2.1s infinite alternate ease-in-out float'
                  }}
                >
                  {/* <PromotionDetail /> */}
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 300,
                  top: -180,
                  left: 210,
                  transform:
                    'translate(0px, 120px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2.8s 1.2s infinite alternate ease-in-out float'
                  }}
                >
                  <BestSeller />
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 330,
                  top: 635,
                  left: 970,
                  transform:
                    'translate(0px, 20px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2.1s 1.5s infinite alternate ease-in-out float'
                  }}
                >
                  {/* <UnresolvedTickets /> */}
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 280,
                  top: 350,
                  left: -65,
                  transform:
                    'translate(0px, 20px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '3.5s 2.4s infinite alternate ease-in-out float'
                  }}
                >
                  {/* <Transfers /> */}
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 420,
                  top: 290,
                  left: 116,
                  transform:
                    'translate(0px, 20px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '1.5s 1s infinite alternate ease-in-out float'
                  }}
                >
                  <RecentOrders />
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 800,
                  top: 210,
                  left: 930,
                  transform:
                    'translate(0px, 20px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2.5s 3s infinite alternate ease-in-out float'
                  }}
                >
                  <TableSummary />
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 400,
                  top: 480,
                  left: 700,
                  transform:
                    'translate(0px, 20px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2.5s 3s infinite alternate ease-in-out float'
                  }}
                >
                  <PromotionDetail />
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 400,
                  top: 545,
                  left: 515,
                  transform:
                    'translate(0px, 20px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              ></Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 330,
                  top: 213,
                  left: 477,
                  transform:
                    'translate(0px, 20px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2s 2s infinite alternate ease-in-out float'
                  }}
                >
                  <EnergyChart />
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: 330,
                  top: 400,
                  left: -315,
                  transform:
                    'translate(0px, 20px) perspective(5200px) rotate(90deg) rotateY(-45deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2s 2s infinite alternate ease-in-out float'
                  }}
                >
                  <VipSummary />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <TypographyFeature>8+</TypographyFeature>
              <TypographyHeading
                sx={{
                  mb: 1
                }}
                variant="h3"
              >
                {t('管理模块')}
              </TypographyHeading>
              <TypographySubHeading
                sx={{
                  lineHeight: 1.5,
                  pr: 8
                }}
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
              >
                {t('使用人如其食，体验现代、高效、自动化的餐厅后台管理')}
              </TypographySubHeading>
            </Box>
          </Grid>
        </Grid>
        <Grid
          spacing={6}
          sx={{
            mt: 4,
            justifyContent: { lg: 'center' }
          }}
          container
        >
          <Grid item md={4}>
            <Box>
              <TypographyFeature>16</TypographyFeature>
              <TypographyHeading
                sx={{
                  mb: 1
                }}
                variant="h3"
              >
                {t('后台管理页面')}
              </TypographyHeading>
              <TypographySubHeading
                sx={{
                  maxWidth: 500,
                  lineHeight: 1.5,
                  mb: 3
                }}
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
              >
                {t(
                  '人如其食集成了16大后台管理操作页面，提供便捷的管理操作和清晰的数据可视化'
                )}
                :
              </TypographySubHeading>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('订单概览')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('订单详情')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('促销概览')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('促销详情')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('能源概览')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('能源数据')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('订单管理')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('会员管理')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('场地管理')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('员工管理')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('排班管理')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('菜品管理')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('实时订单')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('库存管理')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('耗材管理')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    target="_blank"
                    rel="noopener"
                    startIcon={<LaunchTwoToneIcon />}
                    component={Link}
                    href="#"
                    variant="outlined"
                  >
                    {t('资产管理')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={8}>
            <Box
              sx={{
                position: 'relative'
              }}
            >
              <TypographyFeature>3</TypographyFeature>
              <TypographyHeading
                sx={{
                  mb: 1
                }}
                variant="h3"
              >
                {t('用户角色')}
              </TypographyHeading>
              <TypographySubHeading
                sx={{
                  maxWidth: 500,
                  lineHeight: 1.5,
                  pr: 8
                }}
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
              >
                {t('客户、经理、员工')}
              </TypographySubHeading>
              <Typography
                variant="subtitle1"
                sx={{
                  py: 2
                }}
                component="p"
              >
                {/* <Text color="warning">
                  <b>
                    {t(
                      'Includes redux state management, working forms with validation, working filtering and more'
                    )}
                  </b>
                </Text> */}
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} lg={12}>
                  <Card
                    sx={{
                      mt: 2
                    }}
                  >
                    <List disablePadding>
                      <ListItem
                        sx={{
                          py: 2
                        }}
                      >
                        <ListItemAvatar>
                          <AvatarWrapperSuccess>
                            <CheckTwoToneIcon />
                          </AvatarWrapperSuccess>
                        </ListItemAvatar>
                        <ListItemText
                          primary={t('Manager')}
                          primaryTypographyProps={{
                            variant: 'h4',
                            color: 'textPrimary',
                            gutterBottom: true
                          }}
                          secondary={t('便捷管理')}
                          secondaryTypographyProps={{
                            variant: 'subtitle2',
                            noWrap: true
                          }}
                        />
                        <Button
                          size="small"
                          target="_blank"
                          rel="noopener"
                          startIcon={<LaunchTwoToneIcon />}
                          component={Link}
                          href="#"
                        >
                          {t('View')}
                        </Button>
                      </ListItem>
                      <Divider />
                      <ListItem
                        sx={{
                          py: 2
                        }}
                      >
                        <ListItemAvatar>
                          <AvatarWrapperSuccess>
                            <CheckTwoToneIcon />
                          </AvatarWrapperSuccess>
                        </ListItemAvatar>
                        <ListItemText
                          primary={t('Empoyee')}
                          primaryTypographyProps={{
                            variant: 'h4',
                            color: 'textPrimary',
                            gutterBottom: true
                          }}
                          secondary={t('高效工作')}
                          secondaryTypographyProps={{
                            variant: 'subtitle2',
                            noWrap: true
                          }}
                        />
                        <Button
                          size="small"
                          target="_blank"
                          rel="noopener"
                          startIcon={<LaunchTwoToneIcon />}
                          component={Link}
                          href="#"
                        >
                          {t('View')}
                        </Button>
                      </ListItem>
                      <Divider />
                      <ListItem
                        sx={{
                          py: 2
                        }}
                      >
                        <ListItemAvatar>
                          <AvatarWrapperSuccess>
                            <CheckTwoToneIcon />
                          </AvatarWrapperSuccess>
                        </ListItemAvatar>
                        <ListItemText
                          primary={t('User')}
                          primaryTypographyProps={{
                            variant: 'h4',
                            color: 'textPrimary',
                            gutterBottom: true
                          }}
                          secondary={t('高档体验')}
                          secondaryTypographyProps={{
                            variant: 'subtitle2',
                            noWrap: true
                          }}
                        />
                        <Button
                          size="small"
                          target="_blank"
                          rel="noopener"
                          startIcon={<LaunchTwoToneIcon />}
                          component={Link}
                          href="#"
                        >
                          {t('View')}
                        </Button>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            mt: 12,
            mb: 12
          }}
          spacing={4}
        >
          <Grid item md={6} lg={7}>
            <Box
              sx={{
                transform: { xs: 'scale(.9)', md: 'scale(.85)', lg: 'none' },
                left: { xs: '50px', md: '-180px', lg: '-45px' },
                minHeight: 600,
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -150,
                  left: -50,
                  transform:
                    'translate(0px, 120px) perspective(5200px) rotate(87deg) rotateY(330deg) rotateZ(285deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2.1s 2.1s infinite alternate ease-in-out float'
                  }}
                >
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component={'img'}
                        image={'/static/cover/finger.png'}
                        alt="Management Section 1"
                      />
                    </CardActionArea>
                  </Card>
                </Box>
              </Box>
              {/* <Box
                sx={{
                  position: 'absolute',
                  top: 30,
                  left: 180,
                  transform:
                    'translate(0px, 120px) perspective(5200px) rotate(87deg) rotateY(330deg) rotateZ(285deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '1.5s 1s infinite alternate ease-in-out float'
                  }}
                >
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component={'img'}
                        image={'/static/cover/energyRawData.png'}
                        alt="Management Section 2"
                      />
                    </CardActionArea>
                  </Card>
                </Box>
              </Box> */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 120,
                  left: -60,
                  transform:
                    'translate(0px, 120px) perspective(5200px) rotate(87deg) rotateY(330deg) rotateZ(285deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Box
                  sx={{
                    animation: '2.8s 1.2s infinite alternate ease-in-out float'
                  }}
                >
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component={'img'}
                        image={'/static/cover/energyRawData.png'}
                        alt="Management Section 3"
                      />
                    </CardActionArea>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} lg={5}>
            {/* <TypographyFeature>7</TypographyFeature> */}
            <TypographyHeading
              sx={{
                mb: 1
              }}
              variant="h3"
            >
              Web 服务 <br />
              与嵌入式控制
            </TypographyHeading>
            <TypographySubHeading
              sx={{
                maxWidth: 500,
                lineHeight: 1.5,
                pr: 8,
                mb: 4
              }}
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
            >
              {t(
                '人如其食将经典的 web 应用与指纹识别、能源传感器等嵌入式系统结合，全方位提升使用体验'
              )}
            </TypographySubHeading>
          </Grid>
        </Grid>
      </Container>

      <Container
        sx={{
          pt: { xs: 6, md: 12 },
          pb: { xs: 5, md: 15 }
        }}
        maxWidth="md"
      >
        <TypographyH1Primary
          textAlign="center"
          sx={{
            mb: 2
          }}
          variant="h1"
        >
          {t('进入你的餐厅')}
        </TypographyH1Primary>
        <Container
          sx={{
            mb: 6,
            textAlign: 'center'
          }}
          maxWidth="sm"
        >
          <TypographyH2
            sx={{
              pb: 4,
              lineHeight: 1.5
            }}
            textAlign="center"
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            {t('体验轻快的管理')}
          </TypographyH2>

          <Button
            component="a"
            target="_blank"
            size="large"
            href="#"
            rel="noopener"
            variant="outlined"
          >
            {t('开始使用')}
          </Button>
        </Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                overflow: 'visible'
              }}
            >
              <AvatarSuccess
                sx={{
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  position: 'relative',
                  top: -28
                }}
              >
                <CheckTwoToneIcon />
              </AvatarSuccess>
              <Box
                px={4}
                pb={4}
                display={{ xs: 'block', md: 'flex' }}
                alignItems="flex-start"
              >
                <img
                  src="/static/images/overview/figma.svg"
                  style={{ width: 60 }}
                  alt="TechSupport"
                />
                <Box
                  sx={{
                    pl: { xs: 0, md: 3 }
                  }}
                >
                  <Typography variant="h3">{t('技术支持')}</Typography>
                  <Typography
                    sx={{
                      pt: 1
                    }}
                    variant="subtitle2"
                  >
                    {t('请联系系统管理员')}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                mt: { xs: 5, md: 0 },
                overflow: 'visible'
              }}
            >
              <AvatarSuccess
                sx={{
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  position: 'relative',
                  top: -28
                }}
              >
                <CheckTwoToneIcon />
              </AvatarSuccess>
              <Box
                px={4}
                pb={4}
                display={{ xs: 'block', md: 'flex' }}
                alignItems="flex-start"
              >
                <img
                  src="/static/images/overview/sketch.svg"
                  style={{ width: 60 }}
                  alt="Contact"
                />
                <Box
                  sx={{
                    pl: { xs: 0, md: 3 }
                  }}
                >
                  <Typography variant="h3">{t('联系我们')}</Typography>
                  {group.map((p) => {
                    return (
                      <Typography
                    sx={{
                      pt: 1
                    }}
                    variant="subtitle2"
                  >
                    {t(p)}
                  </Typography>
                    )
                  })}

                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </BoxHighlights>
  );
}

export default Highlights;
