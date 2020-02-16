import { UserGroupModelDB } from './userGroup.model';

class UserGroupDataAccessLayer {
    constructor() {
    }

    reinitUserGroup() {
        return UserGroupModelDB.sync({ force: true });
    }

    getAll(){
        return UserGroupModelDB.findAll();
    }

    getUserGroup({ params }) {
        return UserGroupModelDB.findOne({ where: params });
    }
    
    addUserToGroup(data, transaction) {
        return UserGroupModelDB.create(data, transaction);
    }
}

export const DAL = new UserGroupDataAccessLayer();