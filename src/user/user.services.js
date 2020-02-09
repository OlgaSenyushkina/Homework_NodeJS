import uuid from 'uuid/v4';
import { userSchema } from './user.schema';
import { LIMIT_USERS } from '../helpers';
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
        return DAL.getUserByParams({ id, isDeleted: false });
    }

    getUserByLogin(login) {
        return DAL.getUserByParams({ login, isDeleted: false });
    }

    getUsers({ login, limit = LIMIT_USERS }) {
        return login ? 
            DAL.getUsersByLogin({ login, limit, isDeleted: false })
            : DAL.getUsers({ limit, isDeleted: false });
    }

    async addNewUser(data) {
        const foundedUser = await this.getUserByLogin(data.login);

        if (!foundedUser) return null;

        return DAL.createUser({ ...data, isDeleted: false, id: uuid() });
    }

    async updateUserById(id, data) {
        const user = await this.getUserById(id);

        if (!user) return null;
            
        const result = DAL.updateUser({ id, data });

        return result[result.length - 1][0];
    }

    async deleteUserById(id) {
        const user = await this.getUserById(id);
        
        if (!user) return false;

        const data = { isDeleted: true };
            
        const result = DAL.updateUser( { id, data });

        return !!result;
    }
}

export const userModel = new User(userSchema);