

import {
    PrizeUpload,
    PrizeEntity,
    AwardUpload,
    Award
} from '@/models/employee'

import {GetApi,PostApi} from "@/utils/requests"


class AwardApi {

    public async getAward(){
        return (await (GetApi("Prize/GetPrizeInfo",))).data as Award[];
    }


    public async getPrize(){
        return (await (GetApi("Prize/GetPrizeRecord",))).data as PrizeEntity[];
    }

    public async postPrize(prize:PrizeUpload){
        return (await (PostApi("Prize/PostPrizeRecord",prize))).statusText as string
    }

    public async postAward(award:AwardUpload){
        return (await (PostApi("Prize/PostAward",award))).statusText as string
    }

    //Prize/DeleteAward

}

export const awardApi = new AwardApi();