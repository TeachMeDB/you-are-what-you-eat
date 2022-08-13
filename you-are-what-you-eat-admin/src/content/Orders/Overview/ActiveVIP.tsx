import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

import { useRefMounted } from 'src/hooks/useRefMounted';
import type { ActiveVIP } from '@/models/order';
import ActiveVIPData from './ActiveVIPData';
import { ordersApi } from '@/queries/orders'
import { getDayTime } from '@/utils/date';

function ActiveVIPComponent() {
  const isMountedRef = useRefMounted();
  const [activeVIPs, setActiveVIPs] = useState<ActiveVIP[]>([]);

  const getOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getActiveVIPs(
        Number((new Date(getDayTime(new Date(), -7, 'begin')).getTime() / 1000).toFixed(0)), 
        Number((new Date().getTime() / 1000).toFixed(0))
        );

      if (isMountedRef()) {
        setActiveVIPs(response);
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
      {ActiveVIPData(activeVIPs)}
    </Card>
  );
}

export default ActiveVIPComponent;
