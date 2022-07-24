import { useState, useEffect, useCallback } from 'react';
import { Card } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { DishOrderStat } from '@/models/order';
import DishSaleVolume from './DishSaleVolumeTable';
import { ordersApi } from '@/queries/orders'

function DishSaleVolumeList() {
  const isMountedRef = useRefMounted();
  const [dishes, setDishes] = useState<DishOrderStat[]>([]);

  const getDishOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getDishSaleVolumeInTimePeriod(new Date(), new Date());

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
