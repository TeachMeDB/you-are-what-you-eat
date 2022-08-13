import { Card } from '@mui/material';
import { AssetInfo } from '@/models/asset_info';

import AssetInfoTable from './AssetInfoTable';
import { EmployeeInfo } from '@/models/employee_info';

interface AssetInfoProps {
  list: AssetInfo[];
  employees: EmployeeInfo[];
  setAssetInfoes: any;
}

function AllAssetInfoes({ list = [], employees = [], setAssetInfoes }: AssetInfoProps) {
  return (
    <Card>
      <AssetInfoTable assetInfoes={list} setAssetInfoes={setAssetInfoes} employees={employees} />
    </Card>
  );
}

export default AllAssetInfoes;
