import { useState, useEffect, useCallback } from 'react';
import { Card } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { YearlyEnergyDataSortedByType } from '@/models/energy';
import EnergyTypesOverviewUI from './EnergyTypesOverviewUI';
import { energyApi } from 'src/queries/energy';

function EnergyPanel() {
  const isMountedRef = useRefMounted();
  const [yearEnergyData, setYearEnergyData] = useState<
    YearlyEnergyDataSortedByType[]
  >([]);

  const getYearData = useCallback(async () => {
    try {
      const response = await energyApi.getYearlyData();

      if (isMountedRef()) {
        setYearEnergyData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getYearData();
  }, [getYearData]);

  if (yearEnergyData.length < 3) return null;

  return <Card>{EnergyTypesOverviewUI(yearEnergyData)}</Card>;
}

export default EnergyPanel;
