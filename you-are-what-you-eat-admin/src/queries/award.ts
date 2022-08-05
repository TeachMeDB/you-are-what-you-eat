

import {
    PrizeUpload,
    PrizeEntity,
    AwardUpload,
    Award
} from '@/models/employee'

import {GetApi,PostApi} from "@/utils/requests"


class AwardApi {

    public getAward=async ()=>{
        return (await (GetApi("Prize/GetPrizeInfo",))).data as Award[];
    }


    public getPrize= async ()=>{
        return (await (GetApi("Prize/GetPrizeRecord",))).data as PrizeEntity[];
    }

    public postPrize= async (prize:PrizeUpload)=>{
        return (await (PostApi("Prize/PostPrizeRecord",prize))).statusText as string
    }

    public postAward=async (award:AwardUpload)=>{
        return (await (PostApi("Prize/PostAward",award))).statusText as string
    }

    //Prize/DeleteAward

}

export const awardApi = new AwardApi();