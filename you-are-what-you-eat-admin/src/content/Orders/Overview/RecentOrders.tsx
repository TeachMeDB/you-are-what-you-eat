import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

// import { useRefMounted } from 'src/hooks/useRefMounted';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
// import { cryptoOrdersApi } from 'src/mocks/crypto_orders';

function RecentOrdersList() {
  //const isMountedRef = useRefMounted();
  const [orders, setOrders] = useState<CryptoOrder[]>([]);

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
      <RecentOrdersTable cryptoOrders={orders} />
    </Card>
  );
}

export default RecentOrdersList;
