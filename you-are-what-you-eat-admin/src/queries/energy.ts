import {
    EnergyPanelData,
    OverallUsageType,
    YearlyEnergyDataSortedByType,
    OriginalSensorData
} from 'src/models/energy'

class EnergyApi {
    public getCurrentAvailable: () => Promise<EnergyPanelData[]> = async () => {
        const aval = [
            {
                type: '电',
                total: 199,
                available: 199
            },
            {
                type: '水',
                total: 158,
                available: 158
            },
            {
                type: '燃气',
                total: 95,
                available: 95
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

    public getOriginalSensorData: () => Promise<OriginalSensorData[]> = async () => {
        try {
            const r = await (await fetch('http://127.0.0.1:4523/m1/1300227-0-default/api/Sensors/rawdata?start=0&end=465401035168')).text();
            return JSON.parse(r)['data'];
        } 
        catch(err) {
            console.log(err);
            return null;
        }
    }
}

export const energyApi = new EnergyApi();