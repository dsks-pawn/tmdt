import { sequelizeEcommerce } from '../../sequelize';
import Sequelize from 'sequelize';

export const LandForSaleNhaDat24h = sequelizeEcommerce.define('LandForSaleNhaDat24h', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true
    },
    time: {
        type: Sequelize.STRING
    },
    time_end: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.CHAR(500)
    },
    href: {
        type: Sequelize.CHAR(500)
    },
    description: {
        type: Sequelize.CHAR(2000)
    },
    price: {
        type: Sequelize.CHAR(255)
    },
    price_number: {
        type: Sequelize.BIGINT
    },
    area: {
        type: Sequelize.CHAR(255)
    },
    content: {
        type: Sequelize.TEXT
    },
    html_content: {
        type: Sequelize.TEXT
    },
    type_of_news: {
        type: Sequelize.CHAR(255)
    },
    images: {
        type: Sequelize.STRING
    },
    rooms: {
        type: Sequelize.CHAR(500)
    },
    address: {
        type: Sequelize.CHAR(255)
    },
    facade: {
        type: Sequelize.CHAR(255)
    },
    name_project: {
        type: Sequelize.CHAR(255)
    },
    owner: {
        type: Sequelize.CHAR(255)
    },
    contact_name: {
        type: Sequelize.CHAR(255)
    },
    contact_address: {
        type: Sequelize.CHAR(255)
    },
    contact_mobile: {
        type: Sequelize.CHAR(255)
    },
    contact_email: {
        type: Sequelize.CHAR(255)
    },
    code_news: {
        type: Sequelize.CHAR(255)
    },
    code_news_crawl: {
        type: Sequelize.BIGINT
    },
    road_in_front: {
        type: Sequelize.CHAR(255)
    },
    floor: {
        type: Sequelize.CHAR(255)
    },
    size: {
        type: Sequelize.CHAR(255)
    },
    parking: {
        type: Sequelize.BOOLEAN
    },
    createdtime: {
        type: Sequelize.STRING
    },
    index_crawl: {
        type: Sequelize.BIGINT
    },
}, {
        freezeTableName: true,
        timestamps: false,
    });