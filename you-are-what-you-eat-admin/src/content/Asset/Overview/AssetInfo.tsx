import { Card } from '@mui/material';
import { AssetInfo } from '@/models/asset_info';

import AssetInfoTable from './AssetInfoTable';

function AllAssetInfoes() {
  const assetInfoes: AssetInfo[] = [
    {
      AssetsId: '001',
      AssetsName: '包菜',
      AssetsType: '10',
      AssetsDescription: '有机包菜，纯天然，不打农药',
      AssetsStatus: 10,
      EmployeeId: 2,
      EmployeeName: 'Carl',
    },
    {
      AssetsId: '002',
      AssetsName: '猪肉',
      AssetsType: '11',
      AssetsDescription: '黑猪肉，口感好，味道香',
      AssetsStatus: 10,
      EmployeeId: 2,
      EmployeeName: 'Carl',
    },
    {
      AssetsId: '003',
      AssetsName: '牛肉',
      AssetsType: '11',
      AssetsDescription: '小黄牛肉，肉质鲜嫩，烹饪方便',
      AssetsStatus: 10,
      EmployeeId: 2,
      EmployeeName: 'Carl',
    },
    {
      AssetsId: '004',
      AssetsName: '西葫芦',
      AssetsType: '10',
      AssetsDescription: '水生种植，鲜嫩多汁',
      AssetsStatus: 10,
      EmployeeId: 2,
      EmployeeName: 'Carl',
    },
    {
      AssetsId: '005',
      AssetsName: '西蓝花',
      AssetsType: '10',
      AssetsDescription: '颜色翠绿，口感好',
      AssetsStatus: 10,
      EmployeeId: 2,
      EmployeeName: 'Carl',
    },
    {
      AssetsId: '006',
      AssetsName: '荷兰豆',
      AssetsType: '10',
      AssetsDescription: '粒粒鲜嫩，口感独特',
      AssetsStatus: 10,
      EmployeeId: 2,
      EmployeeName: 'Carl',
    },

  ];

  return (
    <Card>
      <AssetInfoTable assetInfoes={assetInfoes} />
    </Card>
  );
}

export default AllAssetInfoes;
