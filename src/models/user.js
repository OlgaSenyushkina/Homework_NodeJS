import * as Joi from '@hapi/joi';
import uuid from 'uuid/v4';
import users from '../data/users.json';
import { sequelize } from "../services";
import { Model, UUID, STRING, INTEGER, BOOLEAN, Op } from "sequelize";

import { 
    REG_EXP_PASSWORD,
    MIN_PASSWORD,
    MAX_PASSWORD,
    MAX_AGE,
    MIN_AGE,
    LIMIT_USERS,
 } from '../helpers/const';

const userSchema = Joi.object({
    login: Joi
        .string()
        .required(),
    password: Joi
        .string()
        .pattern(REG_EXP_PASSWORD)
        .min(MIN_PASSWORD)
        .max(MAX_PASSWORD)
        .required(),
    age: Joi
        .number()
        .integer()
        .min(MIN_AGE)
        .max(MAX_AGE)
        .required(),
});

class UserModelDB extends Model {}
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

class User {
    constructor(users, schema) {
        this.users = users;
        this.schema = schema;

        this.initDB();
    }

    initDB() {
        UserModelDB.sync();
        
        // use it only when debugging
        users.forEach(user => {
            UserModelDB.findOrCreate({
                where: {
                    id: user.id
                },
                defaults: {
                    ...user
                }
            });
        });
    }

    getSchema() {
        return this.schema;
    }

    getUserById(id) {
        return UserModelDB.findOne({ where: { id, isDeleted: false }});
    }

    getUserByLogin(login) {
        return UserModelDB.findOne({ where: { login, isDeleted: false }});
    }

    getUsers({ login, limit = LIMIT_USERS }) {
        if (login) {
            return UserModelDB.findAll({ where: { login: {[Op.like]: `%${login}%`}, isDeleted: false }, limit, order: [['login', 'ASC']] });
        }
        
        return UserModelDB.findAll({ where: { isDeleted: false }, limit });
    }

    addNewUser(data) {
        return this.getUserByLogin(data.login)
            .then(foundedUser => {
                if (foundedUser) return null;
                
                const user = {
                    ...data,
                    isDeleted: false,
                    id: uuid(),
                };

                return UserModelDB.create({
                    ...user
                });
            });
    }

    updateUserById(id, data) {
        return this.getUserById(id)
            .then(user => {
                if (!user) return null;
                return UserModelDB.update(
                    { ...data },
                    { 
                        where: { id },
                        returning: true
                    })
                    .then(result => result[result.length - 1][0])
            });
    }

    deleteUserById(id) {
        return this.getUserById(id)
            .then(user => {
                if (!user) return false;
                return UserModelDB.update(
                    { isDeleted: true },
                    { 
                        where: { id },
                        returning: true
                    })
                    .then(() => true)
            });
    }
}

export const userModel = new User(users, userSchema);



/* 
    
    Создание таблицы:
    CREATE TABLE IF NOT EXISTS "users" ("id" UUID NOT NULL , "login" VARCHAR(255) NOT NULL, "password" VARCHAR(255) NOT NULL, "age" NUMBER NOT NULL, "isDeleted" BOOLEAN NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
    
    Наполнение пользователями:
    INSERT INTO "users" ("id","login","password","age","isDeleted","createdAt","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7)

*/