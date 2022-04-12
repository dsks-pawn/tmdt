import { Proxy } from "../models/schemas/Proxy"
import instances from "../models/services/instances"

const insertMumtipleRecordDataLandForSale = async (data) => {
    Proxy.removeAttribute('id');
    let dataInsert = {
        instances: Proxy,
        data: data
    }
    return await instances.CreateALotRecord(dataInsert)
}

const findRandomOnlyRecord = async () => {
    let dataInsert = {
        instances: Proxy,
        table: 'Proxy'
    }
    return await instances.getRandomOnlyRecord(dataInsert)
}
module.exports = {
    insertMumtipleRecordDataLandForSale,
    findRandomOnlyRecord
}