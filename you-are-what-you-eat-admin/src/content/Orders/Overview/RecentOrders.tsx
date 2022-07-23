import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

// import { useRefMounted } from 'src/hooks/useRefMounted';
// import { CryptoOrder } from 'src/models/crypto_order';
import type { Order } from '@/models/order';
import RecentOrdersTable from './RecentOrdersTable';
// import { cryptoOrdersApi } from 'src/mocks/crypto_orders';

function RecentOrdersList() {
  //const isMountedRef = useRefMounted();
  const [orders, setOrders] = useState<Order[]>([{
    id: '1adfavdscs',
    creation_time: new Date(),
    table_id: 'A33',
    status: 'completed',
    price: 359
  },
  {
    id: '1adfavdscs',
    creation_time: new Date(),
    table_id: 'A33',
    status: 'completed',
    price: 359
  },
  {
    id: '1adfavdscs',
    creation_time: new Date(),
    table_id: 'A33',
    status: 'completed',
    price: 359
  }
]);

  // const getCryptoOrders = useCallback(async () => {
  //   try {
  //     const response = await cryptoOrdersApi.getCryptoOrders();

  //     if (isMountedRef()) {
  //       setCryptoOrders(response);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isMountedRef]);

  // useEffect(() => {
  //   getCryptoOrders();
  // }, [getCryptoOrders]);

  return (
    <Card>
      <RecentOrdersTable orders={orders} />
    </Card>
  );
}

export default RecentOrdersList;
