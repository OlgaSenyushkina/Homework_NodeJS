import { UserModelDB } from './user.model';
import { Op } from 'sequelize';

class UserDataAccessLayer {
    constructor() {
    }

    reinitUsers() {
        return UserModelDB.sync({ force: true });
    }

    getUserByParams(where) {
        return UserModelDB.findOne({ where });
    }

    getUsers({ limit }) {
        const order = [['login', 'ASC']];

        return UserModelDB.findAll({ limit, order });
    }

    getUsersByLogin({ login, limit }) {
        const order = [['login', 'ASC']];
        const where = {
            login: { [Op.like]: `%${login}%` }
        };

        return UserModelDB.findAll({ limit, where, order });
    }

    createUser(data) {
        return UserModelDB.create(data);
    }

    updateUser({ id, data }) {
        const where = { id };
        return UserModelDB.update({ ...data }, { where, returning: true });
    }

    deleteUser({ id }) {
        const where = { id };
        return UserModelDB.destroy({ where });
    }
}

export const DAL = new UserDataAccessLayer();