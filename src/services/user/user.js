import * as Joi from '@hapi/joi';
import uuid from 'uuid/v4';
import users from '../../data/users.json';
import { UserModelDB } from '../../models';
import { Op } from "sequelize";
import { 
    REG_EXP_PASSWORD,
    MIN_PASSWORD,
    MAX_PASSWORD,
    MAX_AGE,
    MIN_AGE,
    LIMIT_USERS,
 } from '../../helpers';

export const userSchema = Joi.object({
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

class User {
    constructor(users, schema) {
        this.users = users;
        this.schema = schema;

        this.initDB();
    }

    initDB() {
        UserModelDB.sync();

        /*
            Наполнение пользователями:
            INSERT INTO "users" ("id","login","password","age","isDeleted","createdAt","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7)
        */
        
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
            return UserModelDB.findAll({ limit,
                where: { 
                    login: { [Op.like]: `%${login}%` },
                    isDeleted: false 
                },
                order: [['login', 'ASC']] 
            });
        }
        
        return UserModelDB.findAll({ limit, where: { isDeleted: false } });
    }

    async addNewUser(data) {
        const foundedUser = await this.getUserByLogin(data.login);
        
        if (foundedUser) {
            return null;
        }
        
        return UserModelDB.create({
            ...data,
            isDeleted: false,
            id: uuid(),
        });
    }

    async updateUserById(id, data) {
        const user = await this.getUserById(id);

        if (!user) {
            return null;
        }
            
        const result = await UserModelDB.update({ ...data }, {
            where: { id },
            returning: true
        });
        
        return result[result.length - 1][0];
    }

    async deleteUserById(id) {
        const user = await this.getUserById(id);
        
        if (!user) {
            return false;
        }
            
        await UserModelDB.update({ isDeleted: true }, {
            where: { id },
            returning: true
        });

        return true;
    }
}


export const userModel = new User(users, userSchema);