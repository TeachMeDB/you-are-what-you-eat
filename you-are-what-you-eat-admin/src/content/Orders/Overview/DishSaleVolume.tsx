import { useState, useEffect, useCallback } from 'react';
import { Card } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { DishOrderStat } from '@/models/order';
import DishSaleVolume from './DishSaleVolumeTable';
import { ordersApi } from '@/queries/orders';
import { getDayTime } from '@/utils/date';
import { format } from 'date-fns';

function DishSaleVolumeList() {
  const isMountedRef = useRefMounted();
  const [dishes, setDishes] = useState<DishOrderStat[]>([]);

  const getDishOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getDishSaleVolumeInTimePeriod(
        getDayTime(new Date(), -7, 'begin'),
        format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      );

      if (isMountedRef()) {
        setDishes(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getDishOrdersInTimePeriod();
  }, [getDishOrdersInTimePeriod]);

  return <Card>{DishSaleVolume(dishes)}</Card>;
}

export default DishSaleVolumeList;
