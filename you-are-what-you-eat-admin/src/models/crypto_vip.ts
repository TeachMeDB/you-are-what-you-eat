export type CryptoVipStatus = '正常' | '冻结' | '注销';

export interface CryptoAllVip {
  vips: CryptoVip[];
  summary: CryptoSummary;
  summary2: CryptoSummary2;
}

export interface CryptoVip {
  user_name: string;
  birthday: string;
  gender: string;
  status: CryptoVipStatus;
  balance: number;
  credit: number;
}

export interface Serie {
  name: string;
  data: number[];
}

export interface CryptoSummary {
  series: Serie[];
  options: {
    chart?: {
      type: 'bar';
      height: 350;
      stacked: true;
      toolbar: {
        show: true;
      };
      zoom: {
        enabled: true;
      };
    };
    responsive?: [
      {
        breakpoint: 480;
        options: {
          legend: {
            position: 'bottom';
            offsetX: -10;
            offsetY: 0;
          };
        };
      }
    ];
    plotOptions?: {
      bar: {
        horizontal: false;
        borderRadius: 10;
      };
    };
    xaxis: {
      type?: 'text';
      categories: string[];
    };
    legend?: {
      position: 'right';
      offsetY: 40;
    };
    fill?: {
      opacity: 1;
    };
  };
}

export interface CryptoSummary2 {
  series: Serie[];
  options: {
    chart?: {
      type: 'bar';
      height: 350;
      stacked: true;
      toolbar: {
        show: true;
      };
      zoom: {
        enabled: true;
      };
    };
    responsive?: [
      {
        breakpoint: 480;
        options: {
          legend: {
            position: 'bottom';
            offsetX: -10;
            offsetY: 0;
          };
        };
      }
    ];
    plotOptions?: {
      bar: {
        horizontal: false;
        borderRadius: 10;
      };
    };
    xaxis: {
      type?: 'text';
      categories: string[];
    };
    legend?: {
      position: 'right';
      offsetY: 40;
    };
    fill?: {
      opacity: 1;
    };
  };
}
