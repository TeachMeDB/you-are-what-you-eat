import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

import { useRefMounted } from 'src/hooks/useRefMounted';
import type { WeekBestSellerData } from '@/models/order';
import BestSellerData from './BestSellerData';
import { ordersApi } from '@/queries/orders';

function BestSellerCard() {
  const isMountedRef = useRefMounted();
  const [weekBestSellerData, setWeekBestSellerData] =
    useState<WeekBestSellerData>({
      best_seller: '',
      total: 0,
      increase: 0,
      breakfast: [],
      lunch: [],
      dinner: [],
      top_list: []
    });

  const getOrdersInTimePeriod = useCallback(async () => {
    try {
      const response = await ordersApi.getWeekBestSellerData();

      if (isMountedRef()) {
        setWeekBestSellerData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOrdersInTimePeriod();
  }, [getOrdersInTimePeriod]);

  return <Card>{BestSellerData(weekBestSellerData)}</Card>;
}

export default BestSellerCard;
