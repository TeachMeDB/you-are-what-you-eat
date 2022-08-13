import { useState, useEffect, useCallback } from 'react';

import { useRefMounted } from 'src/hooks/useRefMounted';
import type { DailyOrderStatic } from '@/models/order';
import StatisticCardData from './StatisticCardData';
import { ordersApi } from '@/queries/orders';

function RecentOrdersList() {
  const isMountedRef = useRefMounted();
  const [statisticData, setStatisticData] = useState<DailyOrderStatic>(null);

  const getOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getDailyOrderStatics();

      if (isMountedRef()) {
        setStatisticData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOrdersInTimePeriod();
  }, [getOrdersInTimePeriod]);

  if (!statisticData) return null;

  return <>{StatisticCardData(statisticData)}</>;
}

export default RecentOrdersList;
