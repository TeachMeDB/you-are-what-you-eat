import { useState, useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
import EnergySurplusUI from './EnergySurplusUI';
import { energyApi } from 'src/queries/energy';

function EnergySurplus() {
  const isMountedRef = useRefMounted();
  const [chart3Data, setChart3Data] = useState(null);

  const getChart3Data = useCallback(async () => {
    try {
      const response = await energyApi.getChart3Data();

      if (isMountedRef()) {
        setChart3Data(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getChart3Data();
  }, [getChart3Data]);

  if (!chart3Data) return null;

  return <>{EnergySurplusUI(chart3Data)}</>;
}

export default EnergySurplus;
