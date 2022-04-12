import Sequelize from 'sequelize';
import config from 'config';

const optionEcommerce = {
  "dialect": config.get("sqlEcommerce.dialect"),
  "host": config.get("sqlEcommerce.host"),
  "database": config.get("sqlEcommerce.database"),
  "user": config.get("sqlEcommerce.user"),
  "password": config.get("sqlEcommerce.password")
}

export const sequelizeEcommerce = new Sequelize(optionEcommerce.database, optionEcommerce.user, optionEcommerce.password, {
  host: optionEcommerce.host,
  port: 1433,
  dialect: optionEcommerce.dialect,
  operatorsAliases: false,
  databaseVersion: "10.50.1617.0",
  dialectOptions: {
    encrypt: false,
    instansName: 'sqlexpress'
  },
  options: {
    encrypt: true
  },
  logging: false,
  define: {
    raw: true,
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
  sync: { force: true },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const Op = Sequelize.Op;