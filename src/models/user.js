import * as Joi from '@hapi/joi';
import uuid from 'uuid/v4';
import users from '../data/users.json';

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

class User {
    constructor(users, schema) {
        this.users = users;
        this.schema = schema;
    }

    getSchema() {
        return this.schema;
    }

    getUserById(id) {
        return this.users.find(user => user.id === id && !user.isDeleted);
    }

    getUserByLogin(login) {
        return this.users.find(user => user.login === login && !user.isDeleted);
    }

    getUsers({ login, limit = LIMIT_USERS }) {
        const users = this.users.filter(user => !user.isDeleted);
    
        if (login) {
            return users
                .filter(user => user.login.includes(login))
                .slice(0, limit)
                .sort((a, b) => {
                    const loginA = a.login.toLowerCase();
                    const loginB = b.login.toLowerCase();
            
                    return (loginA < loginB) ? -1 : (loginA > loginB) ? 1 : 0;
                });
        }
            
        return users;
    }

    addNewUser(data) {
        const isUserExists = this.getUserByLogin(data.login);
        
        if (!isUserExists) {
            const user = {
                ...data,
                isDeleted: false,
                id: uuid(),
            };
        
            this.users.push(user);

            return user;
        }

        return null;
    }

    updateUserById(id, data) {
        const user = this.getUserById(id);

        if (user) {
            const { login, password, age } = data;
            user.login = login;
            user.password = password;
            user.age = Number(age);
        }

        return user || null;
    }

    deleteUserById(id) {
        const user = this.getUserById(id);
        
        if (user) {
            user.isDeleted = true;
        }

        return !!user;
    }
}

export const userModel = new User(users, userSchema);