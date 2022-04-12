import sequelize from 'sequelize'
import { sequelizeEcommerce } from "../../sequelize"

const CreateALotRecord = async (data) => {
    try {
        return await data.instances.bulkCreate(data.data)
    } catch (error) {
        throw error
    }
}

const CreateOnlyRecord = async (data) => {
    try {
        return await data.instances.create(data.data)
    } catch (error) {
        throw error
    }
}

const FindAllRecord = async (data) => {
    try {
        return await data.instances.findAll({
            raw: true,
            where: data.data
        })
    } catch (error) {
        throw error
    }
}


const FindAllRecordDistinct = async (data) => {
    let query = `SELECT DISTINCT ${data.column} from ${data.table}`
    try {
        let result = await sequelizeEcommerce.query(query, { type: sequelize.QueryTypes.SELECT })
        return result
    } catch (error) {
        throw error
    }
}

const UpdateOnlyRecord = async (data) => {
    try {
        return await data.instances.update(
            data.data,
            {
                where: data.where
            }
        )
    } catch (error) {
        throw error
    }
}
const TruncateTable = async (data) => {
    try {
        return await data.instances.destroy({ truncate: true, cascade: false })
    } catch (error) {
        throw error
    }
}

const getTheLatestDateOneRecord = async (data) => {
    let query
    data.where ? query = `SELECT TOP(1) * FROM ${data.table} WHERE ${data.where[0]} = '${data.where[1]}' ORDER BY [${data.column}] DESC` : query = `SELECT TOP(1) * FROM ${data.table} ORDER BY [${data.column}] DESC`
    try {
        let result = await sequelizeEcommerce.query(query, { type: sequelize.QueryTypes.SELECT })
        return result[0]
    } catch (error) {
        throw error
    }
}

const getRandomOnlyRecord = async (data) => {
    let query = `SELECT TOP(1) * FROM ${data.table} ORDER BY NEWID()`
    try {
        let result = await sequelizeEcommerce.query(query, { type: sequelize.QueryTypes.SELECT })
        return result[0]
    } catch (error) {
        throw error
    }
}

module.exports = {
    CreateALotRecord,
    CreateOnlyRecord,
    FindAllRecord,
    TruncateTable,
    UpdateOnlyRecord,
    getTheLatestDateOneRecord,
    FindAllRecordDistinct,
    getRandomOnlyRecord
}