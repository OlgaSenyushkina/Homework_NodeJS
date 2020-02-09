const Sequelize = require('sequelize');
const DB_URL = 'postgres://wpcpjlva:xarRr-5vqBQJkzZ5wQNh6l1U9gQzmwUS@balarama.db.elephantsql.com:5432/wpcpjlva';

export const sequelize = new Sequelize(DB_URL);