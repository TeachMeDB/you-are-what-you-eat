import { FC } from 'react';
import PropTypes from 'prop-types';
import type { OrderDetail } from '@/models/order';
import {
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  Container,
  Tooltip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TableContainer,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';

const TableWrapper = styled(Box)(
  ({ theme }) => `
  border: 1px solid ${theme.colors.alpha.black[10]};
  border-bottom: 0;
  margin: ${theme.spacing(4)} 0;
`
);

interface OrderDetailBody {
  detail: OrderDetail;
}

const InvoiceBody: FC<OrderDetailBody> = ({ detail }) => {
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
              {t('订单详情')}
            </Typography>
            <Typography variant="h3" color="text.secondary">
              #{detail.order_id}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            {/* <LogoWrapper>
              <Logo />
            </LogoWrapper> */}
            {/* <Typography variant="h5" fontWeight="normal">
              83 Laurel Lane
            </Typography>
            <Typography variant="h5" gutterBottom fontWeight="normal">
              Fort Walton Beach, FL 32547
            </Typography>
            <Typography variant="h5" fontWeight="normal">
              New York, USA
            </Typography> */}
          </Box>
        </Box>
        <Divider
          sx={{
            my: 4
          }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>
              {t('桌号')}:
            </Typography>
            <Typography
              sx={{
                pb: 2
              }}
              variant="h5"
            >
              {detail.table_id}
            </Typography>
            {/* <Typography variant="h5" fontWeight="normal">
              519 Bay Meadows Ave.
            </Typography>
            <Typography variant="h5" gutterBottom fontWeight="normal">
              Scotch Plains, NJ 07076
            </Typography>
            <Typography variant="h5" fontWeight="normal">
              New York, USA
            </Typography> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              spacing={4}
              justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
            >
              <Grid item>
                <Typography variant="subtitle2" gutterBottom>
                  {t('订单创建时间')}:
                </Typography>
                <Typography
                  sx={{
                    pb: 2
                  }}
                  variant="h5"
                >
                  {detail.creation_time}
                </Typography>
              </Grid>
              <Grid item>
                {/* <Typography variant="subtitle2" gutterBottom>
                  {t('Due on')}:
                </Typography>
                <Typography
                  sx={{
                    pb: 2
                  }}
                  variant="h5"
                >
                  {format(invoice.dueDate, 'dd MMMM yyyy')}
                </Typography> */}
              </Grid>
            </Grid>
            {/* <BoxWrapper textAlign="right" mt={1} p={3}>
              <Typography component="span" variant="h4" fontWeight="normal">
                {t('Balance due')}:{' '}
              </Typography>
              <Typography component="span" variant="h4">
                {numeral(invoice.amount).format(`${invoice.currency}0,0.00`)}
              </Typography>
            </BoxWrapper> */}
          </Grid>
        </Grid>

        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('菜品名')}</TableCell>
                  <TableCell>{t('菜品状态')}</TableCell>
                  <TableCell>{t('菜品原价')}</TableCell>
                  <TableCell>{t('最终结算')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail.dishes.map((dish) => (
                  <TableRow key={dish.dish_name}>
                    <TableCell>
                      <Typography noWrap>{dish.dish_name}</Typography>
                    </TableCell>
                    <TableCell>{dish.dish_status}</TableCell>
                    <TableCell>
                      {dish.ori_price}
                    </TableCell>
                    <TableCell>
                      {dish.final_payment}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={0} />
                  <TableCell colSpan={4} align="right">
                    <Typography
                      gutterBottom
                      variant="caption"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      {t('结算价')}:
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      ￥{detail.final_payment}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </TableWrapper>
        <Typography variant="subtitle2" gutterBottom>
          {t('备注：')}
        </Typography>
        <Typography variant="body2">
          {''}
        </Typography>
        <Tooltip
          placement="top"
          arrow
          title="This functionality will be added in a future release!"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={4}
          >
            <Button
              disabled
              variant="contained"
              sx={{
                mx: 2
              }}
              startIcon={<DownloadTwoToneIcon />}
            >
              {t('Download PDF')}
            </Button>
            <Button
              disabled
              variant="outlined"
              sx={{
                mx: 2
              }}
              startIcon={<PictureAsPdfTwoToneIcon />}
            >
              {t('Preview PDF')}
            </Button>
          </Box>
        </Tooltip>
      </Card>
    </Container>
  );
};

InvoiceBody.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};

export default InvoiceBody;
