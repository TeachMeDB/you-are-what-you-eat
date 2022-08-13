import { useState, useEffect, useCallback } from 'react';
import { Card } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { DishOrderStat } from '@/models/order';
import DishSaleVolume from './DishSaleVolumeTable';
import { ordersApi } from '@/queries/orders'
import { getDayTime } from '@/utils/date'

function DishSaleVolumeList() {
  const isMountedRef = useRefMounted();
  const [dishes, setDishes] = useState<DishOrderStat[]>([]);

  const getDishOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getDishSaleVolumeInTimePeriod(
        Number((new Date(getDayTime(new Date(), -7, 'begin')).getTime() / 1000).toFixed(0))
        , Number((new Date().getTime() / 1000).toFixed(0)));

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

  return (
    <Card>
      {DishSaleVolume(dishes)}
    </Card>
  );
}

export default DishSaleVolumeList;
