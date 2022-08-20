import { Card } from '@mui/material';
import { FC } from 'react';
import { Chart } from 'src/components/Chart';

const VipSummary: FC = () => {
  const options = {
    chart: {
      type: 'bar' as 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom' as 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10
      }
    },
    xaxis: {
      type: 'category' as 'category',
      categories: []
    },
    legend: {
      position: 'right' as 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };

  const series = [
    {
      name: '',
      data: [114, 514, 191, 98, 521, 314, 159, 265]
    }
  ];

  return (
    <Card>
      <Chart
        notmerge={"true"}
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </Card>
  );
};

export default VipSummary;
