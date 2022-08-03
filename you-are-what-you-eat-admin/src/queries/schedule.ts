

import {
    WorkPlan

} from '@/models/work_plan'

import { GetApi, PostApi } from "@/utils/requests"


class ScheduleApi {

    public async getSchedule(start?: string, end?: string, id?: string, place?: string, occupation?: string) {
        return (await (GetApi("Schedule/GetScheduleInfo", {
            start: start,
            end: end,
            id: id,
            place: place,
            occupation: occupation
        }))).data as WorkPlan[];
    }


}

export const scheduleApi = new ScheduleApi();