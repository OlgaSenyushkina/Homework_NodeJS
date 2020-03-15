const Sequelize = require('sequelize');
export const sequelize = new Sequelize('postgres://' + process.env.DB_URL);