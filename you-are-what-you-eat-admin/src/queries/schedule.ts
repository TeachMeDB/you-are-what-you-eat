

import {
    ScheduleEntity,
    ScheduleUpload,
    People,
    Avaliable
    
} from '@/models/schedule'

import {GetApi,PostApi} from "@/utils/requests"


class ScheduleApi {

    public async getSchedule(start?:string,end?:string,id?:string,place?:string,occupation?:string){
        return (await (GetApi("Schedule/GetScheduleInfo",{
            start:start,
            end:end,
            id:id,
            place:place,
            occupation:occupation
        }))).data as ScheduleEntity[];
    }

    public async getAvailable(start?:string,end?:string,place?:string,occupation?:string){
        return (await (GetApi("/Schedule/GetFreeEmployee",{
            start:start,
            end:end,
            place:place,
            occupation:occupation
        }))).data as Avaliable[];
    }


}

export const scheduleApi = new ScheduleApi();