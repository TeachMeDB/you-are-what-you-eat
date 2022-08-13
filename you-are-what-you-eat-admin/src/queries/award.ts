import {
  PrizeUpload,
  PrizeEntity,
  AwardUpload,
  Award
} from '@/models/employee';

import { DeleteApi, GetApi, PostApi } from '@/utils/requests';

class AwardApi {
  public getAward = async () => {
    return (await GetApi('Prize/GetPrizeInfo')).data as Award[];
  };

  public getPrize = async () => {
    return (await GetApi('Prize/GetPrizeRecord')).data as PrizeEntity[];
  };

  public postPrize = async (prize: PrizeUpload) => {
    return (await PostApi('Prize/PostPrizeRecord', prize)).statusText as string;
  };

  public postAward = async (award: AwardUpload) => {
    return (await PostApi('Prize/PostAward', award)).statusText as string;
  };

  public deleteAward = async (level: string) => {
    return (
      await DeleteApi('Prize/DeleteAward', {
        level: level
      })
    ).statusText as string;
  };
}

export const awardApi = new AwardApi();
