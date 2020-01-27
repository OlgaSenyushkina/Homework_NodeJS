import uuid from 'uuid/v4';
import { UserModelDB } from './user.model';
import { userSchema } from './user.schema';
import { Op } from 'sequelize';
import { LIMIT_USERS } from '../helpers';
import { findUser, findUsers, createUser, initUsers } from './user.DAL';


class User {
    constructor(schema) {
        this.schema = schema;

        // this.reinitDB(); // uncomment to clear table with data
    }

    reinitDB() {
        initUsers({ force: true });
    }

    getSchema() {
        return this.schema;
    }

    getUserById(id) {
        return findUser({ where: { id, isDeleted: false } });
    }

    getUserByLogin(login) {
        return findUser({ where: { login, isDeleted: false } });
    }

    getUsers({ login, limit = LIMIT_USERS }) {
        const data = login ? { 
                limit, 
                where: { isDeleted: false } 
            } : {
                limit, 
                where: { 
                    isDeleted: false,
                    login: { [Op.like]: `%${login}%` },
                },
                order: [['login', 'ASC']] 
            };

        return findUsers({ ...data });
    }

    async addNewUser(data) {
        const foundedUser = await this.getUserByLogin(data.login);
        
        return foundedUser ? null : createUser({ ...data, isDeleted: false, id: uuid() });
    }

    async updateUserById(id, data) {
        const user = await this.getUserById(id);

        if (!user) return null;
            
        const result = await updateUser({ ...data }, { where: { id }, returning: true });
        
        return result[result.length - 1][0];
    }

    async deleteUserById(id) {
        const user = await this.getUserById(id);
        
        if (!user) return false;
            
        await updateUser({ isDeleted: true }, { where: { id }, returning: true });

        return true;
    }
}

export const userModel = new User(userSchema);