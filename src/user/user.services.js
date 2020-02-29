import uuid from 'uuid/v4';
import { userSchema } from './user.schema';
import { LIMIT_USERS, CustomError, statusCodes, CODES } from '../helpers';
import { DAL } from './user.DAL';


class User {
    constructor(schema) {
        this.schema = schema;

        // this.reinitDB(); // uncomment to clear table with data
    }

    reinitDB() {
        return DAL.reinitUsers();
    }

    getSchema() {
        return this.schema;
    }

    getUserById(id) {
        return DAL.getUserByParams({ id });
    }

    getUserByLogin(login) {
        return DAL.getUserByParams({ login });
    }

    getUsers({ login, limit = LIMIT_USERS }) {
        return login ? 
            DAL.getUsersByLogin({ login, limit })
            : DAL.getUsers({ limit });
    }

    async addNewUser(data) {
        const foundedUser = await this.getUserByLogin(data.login);

        if (foundedUser) {
            throw new CustomError({ 
                code: statusCodes[CODES.BAD_DATA],
                message: 'User with this login already exists!',
                service: 'users',
                method: 'addNewUser',
            });
        };

        return DAL.createUser({ 
            ...data,
            id: uuid(),
        });
    }

    async updateUserById(id, data) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'User with this id was not found!',
                service: 'users',
                method: 'updateUserById',
            });
        };

        const result = await DAL.updateUser({ id, data });

        return result && result[result.length - 1][0];
    }

    async deleteUserById(id) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'User with this id was not found!',
                service: 'users',
                method: 'updateUserById',
            });
        };

        const result = await DAL.deleteUser({ id });

        return !!result;
    }
}

export const userModel = new User(userSchema);