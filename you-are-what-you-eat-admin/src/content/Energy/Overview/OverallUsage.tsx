import { useState, useEffect, useCallback } from 'react';
import { Card } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { OverallUsageType } from '@/models/energy';
import OverallUsageUI from './OverallUsageUI';
import { energyApi } from 'src/queries/energy';

function OverallUsage() {
  const isMountedRef = useRefMounted();
  const [overallUsage, setOverallUsage] = useState<OverallUsageType>(null);

  const getOverallUsage = useCallback(async () => {
    try {
      const response = await energyApi.getOverallUsage();

      if (isMountedRef()) {
        setOverallUsage(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOverallUsage();
  }, [getOverallUsage]);

  if (!overallUsage)
    return null;

  return (
    <Card>
      {OverallUsageUI(overallUsage)}
    </Card>
  );
}

export default OverallUsage;
