import { Card } from '@mui/material';
import { AssetInfo } from '@/models/asset_info';

import AssetInfoTable from './AssetInfoTable';
import { EmployeeInfo } from '@/models/employee_info';

interface AssetInfoProps {
  list: AssetInfo[];
  employees: EmployeeInfo[];
}

function AllAssetInfoes({ list = [], employees = [] }: AssetInfoProps) {
  return (
    <Card>
      <AssetInfoTable assetInfoes={list} employees={employees} />
    </Card>
  );
}

export default AllAssetInfoes;
