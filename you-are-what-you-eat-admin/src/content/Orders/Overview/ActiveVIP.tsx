import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

import { useRefMounted } from 'src/hooks/useRefMounted';
import type { ActiveVIP } from '@/models/order';
import ActiveVIPData from './ActiveVIPData';
import { ordersApi } from '@/queries/orders';
import { getDayTime } from '@/utils/date';
import { format } from 'date-fns';

function ActiveVIPComponent() {
  const isMountedRef = useRefMounted();
  const [activeVIPs, setActiveVIPs] = useState<ActiveVIP[]>([]);

  const getOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getActiveVIPs(
        getDayTime(new Date(), -7, 'begin'),
        format(new Date(), 'yyyy-MM-dd HH:mm:ss')
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

  return <Card>{ActiveVIPData(activeVIPs)}</Card>;
}

export default ActiveVIPComponent;
