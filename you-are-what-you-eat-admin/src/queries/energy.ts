import {
    EnergyPanelData,
    OverallUsageType,
    YearlyEnergyDataSortedByType,
    OriginalSensorData
} from 'src/models/energy'
import { GetApi } from 'src/utils/requests';

class EnergyApi {
    public getCurrentAvailable: () => Promise<EnergyPanelData[]> = async () => {
        const aval = [
            {
                type: '电',
                weekly: 199,
                daily: 15
            },
            {
                type: '水',
                weekly: 158,
                daily: 16
            },
            {
                type: '燃气',
                weekly: 95,
                daily: 8
            },
        ];

        return Promise.resolve(aval); 
    }

    public getOverallUsage: () => Promise<OverallUsageType> = async () => {
        const usage: OverallUsageType = {
            view_by_type: [
                {
                    type: '总量',
                    consumption: 15350,
                    ratio: 1
                },
                {
                    type: '电',
                    consumption: 2709,
                    ratio: 0.18
                },
                {
                    type: '水',
                    consumption: 5564,
                    ratio: 0.36
                },
                {
                    type: '燃气',
                    consumption: 7077,
                    ratio: 0.46
                },
            ],
            week_total: [1205, 2394, 1955, 631, 1006, 4053, 4106]
        }
        

        return Promise.resolve(usage);
    }

    public getYearlyData: () => Promise<YearlyEnergyDataSortedByType[]> = async () => {
        const data: YearlyEnergyDataSortedByType[] = [
            {
                type: '水',
                total_consumption: 114514,
                consumption_list: [2000, 2100, 2200, 2300, 1500, 1400, 1800, 2600, 0, 0, 195]
            },
            {
                type: '电',
                total_consumption: 114514,
                consumption_list: [1800, 1900, 2600, 2000, 3500, 2700, 2800, 1900, 0, 654, 0]
            },
            {
                type: '燃气',
                total_consumption: 114514,
                consumption_list: [1500, 3000, 2000, 1600, 2100, 2100, 2200, 2900, 0, 0, 0]
            },
        ]

        return Promise.resolve(data);
    }

    // ok
    public getOriginalSensorData: (start: number, end: number) => Promise<OriginalSensorData[]> = async (start, end) => {
        const r = (await GetApi("Sensors/rawdata", {
            begin: start,
            end  : end
        })).data.data;
        const datas = r.map((data) => {
            return {
                sensor_id: data.sensor_id,
                sensor_type: data.sensor_type,
                sensor_model: data.sensor_model,
                sensor_location: data.sensor_location,
                logs: data.log
            }
        })

        return Promise.resolve(datas);
    }

}

export const energyApi = new EnergyApi();