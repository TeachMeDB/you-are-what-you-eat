import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import type { Promotion } from 'src/models/promotion';
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
import { format } from 'date-fns';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';

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

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  currency: string;
}

const InvoiceBody: FC<PromotionBodyProps> = ({ promotion }) => {
  const { t }: { t: any } = useTranslation();

  const itemsList: Item[] = [
    {
      id: 1,
      name: 'Design services for March',
      quantity: 1,
      price: 8945,
      currency: '$'
    },
    {
      id: 2,
      name: 'Website migration services',
      quantity: 3,
      price: 2367,
      currency: '$'
    }
  ];

  const [items] = useState<Item[]>(itemsList);

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
                {promotion.description}
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
                    <TableCell>
                      {dish.price}
                    </TableCell>
                    <TableCell>
                      {dish.price * (1 - dish.discount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
              </TableFooter>
            </Table>
          </TableContainer>
        </TableWrapper>
        <Typography variant="subtitle2" gutterBottom>
          {t('当前状态')}
        </Typography>
        <Typography variant="body2">
          {promotion.status === 'completed' ? '已结束' : promotion.status === 'running' ? '进行中' : '未开始'}
        </Typography>
        {/* <Tooltip
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
        </Tooltip> */}
      </Card>
    </Container>
  );
};

InvoiceBody.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};

export default InvoiceBody;
