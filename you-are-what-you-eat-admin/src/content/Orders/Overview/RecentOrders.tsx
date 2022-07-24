import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

import { useRefMounted } from 'src/hooks/useRefMounted';
import type { Order } from '@/models/order';
import RecentOrdersTable from './RecentOrdersTable';
import { ordersApi } from '@/queries/orders'

function RecentOrdersList() {
  const isMountedRef = useRefMounted();
  const [orders, setOrders] = useState<Order[]>();

  const getOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getOrdersInTimePeriod(new Date(), new Date());

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
