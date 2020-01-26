import { sequelize } from '../../services';
import { Model, UUID, STRING, INTEGER, BOOLEAN } from 'sequelize';

export class UserModelDB extends Model {}

/* 
    Создание таблицы:
    CREATE TABLE IF NOT EXISTS "users" ("id" UUID NOT NULL , "login" VARCHAR(255) NOT NULL, "password" VARCHAR(255) NOT NULL, "age" NUMBER NOT NULL, "isDeleted" BOOLEAN NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
*/

UserModelDB.init({
    id: { type: UUID, primaryKey: true, allowNull: false, unique: true },
    login: { type: STRING, allowNull: false, unique: true },
    password: { type: STRING, allowNull: false },
    age: { type: INTEGER, allowNull: false },
    isDeleted: { type: BOOLEAN, allowNull: false },
}, {
    sequelize,
    modelName: 'user'
})