import { sequelize } from '../db';
import { Model, UUID, STRING, INTEGER, BOOLEAN } from 'sequelize';

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