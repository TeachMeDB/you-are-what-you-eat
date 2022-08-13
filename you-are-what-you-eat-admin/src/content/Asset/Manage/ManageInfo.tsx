import { Card } from '@mui/material';
import { ManageInfo } from '@/models/manage_info';

import ManageInfoTable from './ManageInfoTable';
import { EmployeeInfo } from '@/models/employee_info';
import { AssetInfo } from '@/models/asset_info';

interface ManageInfoProps {
  list: ManageInfo[];
  employees: EmployeeInfo[];
  assets: AssetInfo[];
  setManageInfoes: any;
}

function AllManageInfo({ list = [], assets = [], employees = [], setManageInfoes }: ManageInfoProps) {
  return (
    <Card>
      <ManageInfoTable manageInfoes={list} setManageInfoes={setManageInfoes} assets={assets} employees={employees} />
    </Card>
  );
}

export default AllManageInfo;
