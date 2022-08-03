
import {
    StockInfo
} from '@/models/stock_info'

import { GetApi } from "@/utils/requests"


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
}

export const stockInfoApi = new StockInfoApi();