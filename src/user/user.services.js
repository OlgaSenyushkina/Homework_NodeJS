import uuid from 'uuid/v4';
import { userSchema } from './user.schema';
import { LIMIT_USERS } from '../helpers';
import { CustomError } from '../helpers/errorsHandler';
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

        if (foundedUser) return null;

        return DAL.createUser({ 
            ...data,
            id: uuid(),
        });
    }

    async updateUserById(id, data) {
        const user = await this.getUserById(id);

        if (!user) return null;
            
        const result = await DAL.updateUser({ id, data });

        return result[result.length - 1][0];
    }

    async deleteUserById(id) {
        try {
            const user = this.getUserById(id);
        
            if (!user) return false;
                
            const result = await DAL.deleteUser({ id });
    
            return !!result;
        } catch(error) {
            console.log(error);
            if (error.code) {
                throw error;
            }
            throw new CustomError({
                message: error.message,
                service: 'users',
                method: 'deleteUser',
            });
        }
    }
}

export const userModel = new User(userSchema);