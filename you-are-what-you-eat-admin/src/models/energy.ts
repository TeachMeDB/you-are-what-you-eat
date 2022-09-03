export interface EnergyPanelData {
  type: string;
  daily: number;
  weekly: number;
}

export interface TypeWeekUsage {
  type: string;
  consumption: number;
  ratio: number;
}

export interface OverallUsageType {
  view_by_type: TypeWeekUsage[];
  week_total: number[];
}

export interface YearlyEnergyDataSortedByType {
  type: string;
  total_consumption: number;
  consumption_list: number[];
}

export interface Log {
  time: string;
  value: number;
}

export interface OriginalSensorData {
  sensor_id: string;
  sensor_type: string;
  sensor_model: string;
  sensor_location: string;
  logs: Log[];
}
