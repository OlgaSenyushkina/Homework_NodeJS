import { DB_URL } from '../helpers';
import { Model, UUID, STRING, INTEGER, BOOLEAN } from 'sequelize';

const Sequelize = require('sequelize');
export const sequelize = new Sequelize(DB_URL);

export class UserModelDB extends Model {}

UserModelDB.init({
    id: { type: UUID, primaryKey: true, allowNull: false, unique: true },
    login: { type: STRING, allowNull: false, unique: true },
    password: { type: STRING, allowNull: false },
    age: { type: INTEGER, allowNull: false },
    isDeleted: { type: BOOLEAN, allowNull: false },
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
})