export interface Repair {
  name: string;
  phone: string;
  longitude: number;
  latitude: number;
}

export interface AssetInfo {
  assets_id: string,
  assets_type: string,
  employee_id?: number,
  employee_name?: string,
  assets_status: number,
  repair: Repair[],
}
