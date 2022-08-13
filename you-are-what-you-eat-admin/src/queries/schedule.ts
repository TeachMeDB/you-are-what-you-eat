

import {
  ScheduleEntity,
  ScheduleUpload,
  People,
  Avaliable
  
} from '@/models/schedule'

import {DeleteApi, GetApi,PostApi} from "@/utils/requests"


class ScheduleApi {

  public getSchedule=async (start?:string,end?:string,id?:string,place?:string,occupation?:string)=>{
      let response=await (GetApi("Schedule/GetScheduleInfo",{
          start:start,
          end:end,
          id:id,
          place:place,
          occupation:occupation
      }));

      if(response.status===200){
          return response.data as ScheduleEntity[];
      }
      return [] as ScheduleEntity[];
  }

  public getAvailable=async (start?:string,end?:string,place?:string,occupation?:string)=>{
      let response= (await (GetApi("Schedule/GetFreeEmployee",{
          start:start,
          end:end,
          place:place,
          occupation:occupation
      })));

      if(response.status===200){
          return response.data as Avaliable[];
      }
      return [] as Avaliable[]
  }

  public postSchedule=async (schedule:ScheduleUpload)=>{
      return (await (PostApi("Schedule/PostScheduleInfo",schedule))).statusText as string
  }


  public deleteSchedule=async (id:string)=>{

      return (await DeleteApi("Schedule/DeleteScheduleInfo",{
          id:id
      })).statusText as string
  }


}

export const scheduleApi = new ScheduleApi();