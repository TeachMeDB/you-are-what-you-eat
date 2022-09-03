import {
  EnergyPanelData,
  OverallUsageType,
  YearlyEnergyDataSortedByType,
  OriginalSensorData
} from 'src/models/energy';
import { GetApi } from 'src/utils/requests';
import { getDayTime, getMonthsDateArray } from 'src/utils/date';
import { arrSum } from 'src/utils/array';

class EnergyApi {
  // OK
  public getCurrentAvailable: () => Promise<EnergyPanelData[]> = async () => {
    const todayStart = getDayTime(new Date(), 0, 'begin');
    // console.log(`todayStart${todayStart}`)
    const todayEnd = getDayTime(new Date(), 0, 'end');
    // console.log(`todayEnd${todayEnd}`)
    const thisWeekStart = getDayTime(new Date(), -7, 'begin');
    // console.log(`thisWeekStart${thisWeekStart}`)

    const today = (
      await GetApi('Sensors/used', {
        begin: todayStart,
        end: todayEnd
      })
    ).data.data;
    // console.log(`today${JSON.stringify(today)}`)

    const week = (
      await GetApi('Sensors/used', {
        begin: thisWeekStart,
        end: todayEnd
      })
    ).data.data;
    // console.log(`week${JSON.stringify(week)}`)

    const today_power = today.filter((e) => e.type === '电表:KwH')[0]
      .consumption;
    const week_power = week.filter((e) => e.type === '电表:KwH')[0].consumption;
    // console.log('today', today_power);
    const today_water = today.filter((e) => e.type === '水表:Ton')[0]
      .consumption;
    const week_water = week.filter((e) => e.type === '水表:Ton')[0].consumption;

    const today_gas = today.filter((e) => e.type === '气表:m^3')[0].consumption;
    const week_gas = week.filter((e) => e.type === '气表:m^3')[0].consumption;

    const aval = [
      {
        type: '电表:KwH',
        weekly: week_power,
        daily: today_power
      },
      {
        type: '水表:Ton',
        weekly: week_water,
        daily: today_water
      },
      {
        type: '气表:m^3',
        weekly: week_gas,
        daily: today_gas
      }
    ];

    return Promise.resolve(aval);
  };

  // OK
  public getOverallUsage: () => Promise<OverallUsageType> = async () => {
    // const usage: OverallUsageType = {
    //     view_by_type: [
    //         {
    //             type: '总量',
    //             consumption: 15350,
    //             ratio: 1
    //         },
    //         {
    //             type: '电',
    //             consumption: 2709,
    //             ratio: 0.18
    //         },
    //         {
    //             type: '水',
    //             consumption: 5564,
    //             ratio: 0.36
    //         },
    //         {
    //             type: '燃气',
    //             consumption: 7077,
    //             ratio: 0.46
    //         },
    //     ],
    //     week_total: [1205, 2394, 1955, 631, 1006, 4053, 4106]
    // }
    const weekOriConsumptionArray = await Promise.all(
      [-6, -5, -4, -3, -2, -1, 0].map(async (offset) => {
        return (
          await GetApi('Sensors/used', {
            begin: getDayTime(new Date(), offset, 'begin'),
            end: getDayTime(new Date(), offset, 'end')
          })
        ).data.data;
      })
    );
    console.log(weekOriConsumptionArray);
    const weekTotalArr = weekOriConsumptionArray.map((dailyData) =>
      arrSum(dailyData, (e) => e.consumption)
    );
    const weekTotal = arrSum(weekTotalArr, (d) => d);
    const weekGasTotal = arrSum(
      weekOriConsumptionArray.map((dailyData) => dailyData[0]),
      (e) => e.consumption
    );
    const weekPwrTotal = arrSum(
      weekOriConsumptionArray.map((dailyData) => dailyData[1]),
      (e) => e.consumption
    );
    const weekWtrTotal = arrSum(
      weekOriConsumptionArray.map((dailyData) => dailyData[2]),
      (e) => e.consumption
    );
    const usage: OverallUsageType = {
      view_by_type: [
        {
          type: '总量',
          consumption: weekTotal,
          ratio: 1
        },
        {
          type: '电',
          consumption: weekPwrTotal,
          ratio: weekTotal === 0 ? 1 : weekPwrTotal / weekTotal
        },
        {
          type: '水',
          consumption: weekWtrTotal,
          ratio: weekTotal === 0 ? 1 : weekWtrTotal / weekTotal
        },
        {
          type: '燃气',
          consumption: weekGasTotal,
          ratio: weekTotal === 0 ? 1 : weekGasTotal / weekTotal
        }
      ],
      week_total: weekTotalArr
    };

    return Promise.resolve(usage);
  };

  // OK
  public getYearlyData: () => Promise<YearlyEnergyDataSortedByType[]> =
    async () => {
      const begins = getMonthsDateArray('begin');
      const ends = getMonthsDateArray('end');
      const monthOriConsumptionArray = await Promise.all(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(async (idx) => {
          return (
            await GetApi('Sensors/used', {
              begin: begins[idx],
              end: ends[idx]
            })
          ).data.data;
        })
      );
      const waterConsumptionList = monthOriConsumptionArray.map(
        (e) => e[2].consumption
      );
      const waterSum = arrSum(waterConsumptionList, (e) => e);
      const powerConsumptionList = monthOriConsumptionArray.map(
        (e) => e[1].consumption
      );
      const powerSum = arrSum(powerConsumptionList, (e) => e);
      const gasConsumptionList = monthOriConsumptionArray.map(
        (e) => e[0].consumption
      );
      const gasSum = arrSum(gasConsumptionList, (e) => e);

      const data: YearlyEnergyDataSortedByType[] = [
        {
          type: '水',
          total_consumption: waterSum,
          consumption_list: waterConsumptionList
        },
        {
          type: '电',
          total_consumption: powerSum,
          consumption_list: powerConsumptionList
        },
        {
          type: '燃气',
          total_consumption: gasSum,
          consumption_list: gasConsumptionList
        }
      ];

      return Promise.resolve(data);
    };

  // OK
  public getOriginalSensorData: (
    start: string,
    end: string
  ) => Promise<OriginalSensorData[]> = async (start, end) => {
    const r = (
      await GetApi('Sensors/rawdata', {
        begin: start,
        end: end
      })
    ).data.data;
    const datas = r.map((data) => {
      return {
        sensor_id: data.sensor_id,
        sensor_type: data.sensor_type,
        sensor_model: data.sensor_model,
        sensor_location: data.sensor_location,
        logs: data.log
      };
    });

    return Promise.resolve(datas);
  };

  // OK
  public getChart3Data: () => Promise<{
    total: number[];
    respectively: {
      name: string;
      type: 'area';
      data: number[];
    }[];
  }> = async () => {
    const begins = getMonthsDateArray('begin');
    const ends = getMonthsDateArray('end');
    const monthOriConsumptionArray = await Promise.all(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(async (idx) => {
        return (
          await GetApi('Sensors/used', {
            begin: begins[idx],
            end: ends[idx]
          })
        ).data.data;
      })
    );
    const waterConsumptionList = monthOriConsumptionArray.map(
      (e) => e[2].consumption
    );
    const waterSum = arrSum(waterConsumptionList, (e) => e);
    const powerConsumptionList = monthOriConsumptionArray.map(
      (e) => e[1].consumption
    );
    const powerSum = arrSum(powerConsumptionList, (e) => e);
    const gasConsumptionList = monthOriConsumptionArray.map(
      (e) => e[0].consumption
    );
    const gasSum = arrSum(gasConsumptionList, (e) => e);

    return Promise.resolve({
      total: [waterSum, powerSum, gasSum],
      respectively: [
        {
          name: '水',
          type: 'area',
          data: waterConsumptionList
        },
        {
          name: '电',
          type: 'area',
          data: powerConsumptionList
        },
        {
          name: '气',
          type: 'area',
          data: gasConsumptionList
        }
      ]
    });
  };
}

export const energyApi = new EnergyApi();
