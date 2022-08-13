import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

import { useRefMounted } from 'src/hooks/useRefMounted';
import type { Order } from '@/models/order';
import RecentOrdersTable from './RecentOrdersTable';
import { ordersApi } from '@/queries/orders';

import { format } from 'date-fns';

function RecentOrdersList() {
  const isMountedRef = useRefMounted();
  const [orders, setOrders] = useState<Order[]>();

  const getOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getOrdersInTimePeriod(
        '1970-01-01 00:00:00',
        format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      );

      if (isMountedRef()) {
        setOrders(response);
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
      <RecentOrdersTable orders={orders} />
    </Card>
  );
}

export default RecentOrdersList;
