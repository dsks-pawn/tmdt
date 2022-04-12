import { sequelizeEcommerce } from '../../sequelize';
import Sequelize from 'sequelize';

export const Proxy = sequelizeEcommerce.define('Proxy', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true
    },
    ip: {
        type: Sequelize.CHAR(255)
    },
    port: {
        type: Sequelize.CHAR(255)
    },
    last_update: {
        type: Sequelize.CHAR(255)
    },
    anonymity_level: {
        type: Sequelize.CHAR(255)
    },
    country: {
        type: Sequelize.CHAR(255)
    },
    city: {
        type: Sequelize.CHAR(255)
    },
    uptime: {
        type: Sequelize.CHAR(255)
    },
    response_time: {
        type: Sequelize.CHAR(255)
    },
    createdtime: {
        type: Sequelize.STRING
    },
}, {
        freezeTableName: true,
        timestamps: false,
    });
