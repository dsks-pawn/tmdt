import { LandForSaleNhaDat24h } from "../models/schemas/LandForSaleNhaDat24h"  
import instances from "../models/services/instances"

const insertOnlyRecordDataLandForSale = async (data) => {
    LandForSaleNhaDat24h.removeAttribute('id');
    let dataInsert = {
        instances: LandForSaleNhaDat24h,
        data: data
    }
    return await instances.CreateOnlyRecord(dataInsert)
}

const findOnlyRecordDataLandForSaleByCodeNews = async (data) => {
    let dataInsert = {
        instances: LandForSaleNhaDat24h,
        data: {
            code_news: data
        }
    }
    return await instances.FindAllRecord(dataInsert)
}


module.exports = {
    insertOnlyRecordDataLandForSale,
    findOnlyRecordDataLandForSaleByCodeNews,
}