import {
  Divider,
  Box,
  Card,
  Typography,
  alpha,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  IconButton,
  styled,
  useTheme,
  Tooltip
} from '@mui/material';
import Link from 'src/components/Link';

import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
  SparklinesSpots
} from 'react-sparklines';

import { useTranslation } from 'react-i18next';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';

import { DishOrderStat } from '@/models/order';
import { join } from '@/utils/array'

const TableWrapper = styled(Table)(
  ({ theme }) => `

    thead tr th {
        border: 0;
    }

    tbody tr td {
        position: relative;
        border: 0;

        & > div {
            position: relative;
            z-index: 5;
        }

        &::before {
            position: absolute;
            left: 0;
            top: 0;
            transition: ${theme.transitions.create(['all'])};
            height: 100%;
            width: 100%;
            content: "";
            background: ${theme.colors.alpha.white[100]};
            border-top: 1px solid ${theme.colors.alpha.black[10]};
            border-bottom: 1px solid ${theme.colors.alpha.black[10]};
            pointer-events: none;
            z-index: 4;
        }

        &:first-of-type:before {
            border-top-left-radius: ${theme.general.borderRadius};
            border-bottom-left-radius: ${theme.general.borderRadius};
            border-left: 1px solid ${theme.colors.alpha.black[10]};
        }
        

        &:last-child:before {
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
            border-right: 1px solid ${theme.colors.alpha.black[10]};
        }
    }

    tbody tr:hover td::before {
        background: ${alpha(theme.colors.primary.main, 0.02)};
        border-color: ${alpha(theme.colors.alpha.black[100], 0.25)} !important;
    }

  `
);

const TableRowDivider = styled(TableRow)(
  ({ theme }) => `
    height: ${theme.spacing(2)};
  `
);

const LabelWarning = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.palette.warning.main};
    color: ${theme.palette.warning.contrastText};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    line-height: 23px;
    height: 22px;
    padding: ${theme.spacing(0, 2)};
    border-radius: ${theme.general.borderRadius};
  `
);

const TableHeadWrapper = styled(TableHead)(
  ({ theme }) => `
      .MuiTableCell-root {
          text-transform: none;
          font-weight: normal;
          color: ${theme.colors.alpha.black[100]};
          font-size: ${theme.typography.pxToRem(16)};
          padding: ${theme.spacing(2)};
      }

      .MuiTableRow-root {
          background: transparent;
      }
  `
);

function DishSaleVolume( dishes: DishOrderStat[] ) {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
      <Box
        px={3}
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            gutterBottom
            sx={{
              fontSize: `${theme.typography.pxToRem(16)}`
            }}
            variant="h4"
          >
            {t('单品销量')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Reports for what we sold this week')}
          </Typography>
        </Box>
        <IconButton color="primary">
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box px={3} pb={3}>
        <TableContainer>
          <TableWrapper>
            <TableHeadWrapper>
              <TableRow>
                <TableCell>{t('菜品')}</TableCell>
                <TableCell align="left">{t('总售价')}</TableCell>
                <TableCell align="left">{t('单价')}</TableCell>
                <TableCell align="center">{t('类型')}</TableCell>
                <TableCell align="center">{t('趋势')}</TableCell>
                <TableCell align="right">{t('售出份数')}</TableCell>
              </TableRow>
            </TableHeadWrapper>
            <TableBody>

              {dishes.map((dish) => {
                return (<><TableRow hover>
                  <TableCell>
                    <Box>
                      <Link href="#" variant="h4" noWrap>
                        {dish.name}
                      </Link>
                      <Typography variant="subtitle1" noWrap>
                        {dish.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography variant="h4" noWrap>
                        ￥{dish.total_credit}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography variant="h4" noWrap>
                        ￥{dish.price}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <Tooltip title={join(dish.tags, '; ')}>
                        <LabelWarning>
                          {dish.tags.length !== 0 ? dish.tags[0] : ''}
                        </LabelWarning>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <Sparklines
                        margin={6}
                        data={dish.trend}
                      >
                        <SparklinesLine
                          style={{
                            stroke: theme.colors.primary.main,
                            strokeWidth: 3,
                            fill: 'none'
                          }}
                        />
                        <SparklinesSpots
                          size={4}
                          style={{
                            fill: theme.colors.alpha.white[100],
                            stroke: theme.colors.primary.main,
                            strokeWidth: 3
                          }}
                        />
                        <SparklinesReferenceLine
                          style={{
                            stroke: theme.colors.error.main
                          }}
                          type="mean"
                        />
                      </Sparklines>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div>
                      <Typography
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center'
                        }}
                        color="text.secondary"
                      >
                        <Typography
                          sx={{
                            pr: 0.5
                          }}
                          component="span"
                          variant="h4"
                          color="text.primary"
                        >
                          {dish.order_times}
                        </Typography>
                        <ArrowUpwardTwoToneIcon
                          sx={{
                            opacity: 0.6
                          }}
                        />
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRowDivider /></>)
              })}
            </TableBody>
          </TableWrapper>
        </TableContainer>
      </Box>
    </Card>
  );
}

export default DishSaleVolume;
