import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import type { ApexOptions } from 'apexcharts';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { CryptoSummary2 } from '@/models/crypto_table';
import { FC, ChangeEvent, useState } from 'react';
import { Chart } from 'src/components/Chart';


interface TableSummaryProps {
  className?: string;
  cryptoSummary2: CryptoSummary2;
}


//function TableSummary(cryptoSummary: CryptoSummary) 
const TableSummary2: FC<TableSummaryProps> = ({ cryptoSummary2 }) =>
{
  const theme = useTheme();

  return (
    <Card>
      <Chart  options={cryptoSummary2.options} series={cryptoSummary2.series} type="bar" height={350} />
    </Card>
  );
}

export default TableSummary2;

/*
  const summary2=
  {          
    series: [
      {
      name: 'PRODUCT A',
      data: [44, 55, 41, 67, 22, 43]
    }, 
    {
      name: 'PRODUCT B',
      data: [13, 23, 20, 8, 13, 27]
    }, 
    {
      name: 'PRODUCT C',
      data: [11, 17, 15, 15, 21, 14]
    }, 
    {
      name: 'PRODUCT D',
      data: [21, 7, 25, 13, 22, 8]
    }
    ],
    options: 
    {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: 
      [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: 
      {
        bar: {
          horizontal: false,
          borderRadius: 10
        },
      },
      xaxis: 
      {
        type: 'datetime',
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
          '01/05/2011 GMT', '01/06/2011 GMT'
        ],
      },
      legend: 
      {
        position: 'right',
        offsetY: 40
      },
      fill: 
      {
        opacity: 1
      }
    },    
  };
*/
