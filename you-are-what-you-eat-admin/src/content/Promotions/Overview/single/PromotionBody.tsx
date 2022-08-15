import { FC } from 'react';
import PropTypes from 'prop-types';
import type { Promotion } from 'src/models/promotion';
import {
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TableContainer,
  styled
} from '@mui/material';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { getDesc } from '@/utils/array';

const BoxWrapper = styled(Box)(
  ({ theme }) => `
  border-radius: ${theme.general.borderRadius};
  background: ${theme.colors.alpha.black[5]};
`
);

const TableWrapper = styled(Box)(
  ({ theme }) => `
  border: 1px solid ${theme.colors.alpha.black[10]};
  border-bottom: 0;
  margin: ${theme.spacing(4)} 0;
`
);

interface PromotionBodyProps {
  promotion: Promotion;
}

const PromotionBody: FC<PromotionBodyProps> = ({ promotion }) => {
  const { t }: { t: any } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          p: 3,
          mb: 3
        }}
      >
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h1" gutterBottom>
              {t('促销活动')}
            </Typography>
            <Typography variant="h3" color="text.secondary">
              #{promotion.name}
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            my: 4
          }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              spacing={4}
              // justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
            >
              <Grid item>
                <Typography variant="subtitle2" gutterBottom>
                  {t('开始时间')}:
                </Typography>
                <Typography
                  sx={{
                    pb: 2
                  }}
                  variant="h5"
                >
                  {format(promotion.start, 'dd MMMM yyyy')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" gutterBottom>
                  {t('截止时间')}:
                </Typography>
                <Typography
                  sx={{
                    pb: 2
                  }}
                  variant="h5"
                >
                  {format(promotion.end, 'dd MMMM yyyy')}
                </Typography>
              </Grid>
            </Grid>
            <BoxWrapper textAlign="left" mt={1} p={1}>
              <Typography component="span" variant="h4" fontWeight="normal">
                {t('活动详情')}:{' '}
              </Typography>
            </BoxWrapper>
            <BoxWrapper textAlign="left" mt={1} p={1}>
              <Typography component="span" variant="h4">
                {getDesc(promotion.description)}
              </Typography>
            </BoxWrapper>
          </Grid>
        </Grid>

        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('菜品')}</TableCell>
                  <TableCell>{t('折扣')}</TableCell>
                  <TableCell>{t('原价')}</TableCell>
                  <TableCell>{t('折后价')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotion.dishes.map((dish) => (
                  <TableRow key={dish.name}>
                    <TableCell>
                      <Typography noWrap>{dish.name}</Typography>
                    </TableCell>
                    <TableCell>{`${dish.discount * 100}%`}</TableCell>
                    <TableCell>￥{dish.price.toFixed(2)}</TableCell>
                    <TableCell>
                      ￥{(dish.price * (1 - dish.discount)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
        </TableWrapper>
        <Typography variant="subtitle2" gutterBottom>
          {t('当前状态')}
        </Typography>
        <Typography variant="body2">
          {promotion.status === 'completed'
            ? '已结束'
            : promotion.status === 'running'
            ? '进行中'
            : '未开始'}
        </Typography>
      </Card>
    </Container>
  );
};

PromotionBody.propTypes = {
  // @ts-ignore
  promotion: PropTypes.object.isRequired
};

export default PromotionBody;
