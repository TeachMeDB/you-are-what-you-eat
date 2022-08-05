
import {
    StockInfo
} from '@/models/stock_info'

import { GetApi, PostApi } from "@/utils/requests"


class StockInfoApi {

    public async getStockInfo(amount?: number, date?: string, ing_name?: string, record_id?: string, surplus?: number) {
        return (await (GetApi("/IngredientRecords", {
            amount: amount,
            date: date,
            ing_name: ing_name,
            record_id: record_id,
            surplus: surplus,
        }))).data as StockInfo[];
    }


    public postStock = async (stockinfo: StockInfo) => {
        return (await (PostApi("/IngredientRecords/AddIngredientRecord", stockinfo))).statusText as string
    }

    public updateStock = async (record_id: number, surplus: number) => {
        return (await (PostApi("/IngredientRecords/UpdateIngredientRecord", {
            record_id,
            surplus
        }))).statusText as string
    }
}

export const stockInfoApi = new StockInfoApi();