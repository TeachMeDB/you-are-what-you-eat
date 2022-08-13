import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

import { useRefMounted } from 'src/hooks/useRefMounted';
import type { OrderReport } from '@/models/order';
import OrderReportData from './OrderReportData';
import { ordersApi } from '@/queries/orders'

function OrderReportCard() {
  const isMountedRef = useRefMounted();
  const [orderReport, setOrderReport] = useState<OrderReport>({
    breakfast_order_num: 0,
    breakfast_turnover: 0,
    lunch_order_num: 0,
    lunch_turnover: 0,
    dinner_order_num: 0,
    dinner_turnover: 0
});

  const getOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getDailyOrderReport();

      if (isMountedRef()) {
        setOrderReport(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOrdersInTimePeriod();
  }, [getOrdersInTimePeriod]);

  return (
    <Card>
      {OrderReportData(orderReport)}
    </Card>
  );
}

export default OrderReportCard;
