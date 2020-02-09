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

    getUsers({ limit, isDeleted }) {
        const order = [['login', 'ASC']];
        const where = { isDeleted };

        return UserModelDB.findAll({ limit, where, order });
    }

    getUsersByLogin({ login, isDeleted, limit }) {
        const order = [['login', 'ASC']];
        const where = {
            isDeleted,
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
}

export const DAL = new UserDataAccessLayer();