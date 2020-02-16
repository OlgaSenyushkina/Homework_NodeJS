import { sequelize } from '../db';
import { Model, SERIAL, INTEGER, UUID } from 'sequelize';

export class UserGroupModelDB extends Model {}

UserGroupModelDB.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: SERIAL,
    },
    groupId: {
        type: UUID,
        allowNull: false,
    },
    userId: {
        type: UUID,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: false,
    modelName: 'userGroup'
});