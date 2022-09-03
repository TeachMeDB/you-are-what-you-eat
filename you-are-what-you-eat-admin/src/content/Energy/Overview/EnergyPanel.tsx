import { useState, useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
import type { EnergyPanelData } from '@/models/energy';
import EnergyPanelUI from './EnergyPanelUI';
import { energyApi } from 'src/queries/energy';

function EnergyPanel() {
  const isMountedRef = useRefMounted();
  const [energyPanelData, setEnergyPanelData] = useState<EnergyPanelData[]>([]);

  const getEnergyPanelData = useCallback(async () => {
    try {
      const response = await energyApi.getCurrentAvailable();

      if (isMountedRef()) {
        setEnergyPanelData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getEnergyPanelData();
  }, [getEnergyPanelData]);

  return <>{EnergyPanelUI(energyPanelData)}</>;
}

export default EnergyPanel;
