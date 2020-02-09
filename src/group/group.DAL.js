import { GroupModelDB } from './group.model';

class GroupDataAccessLayer {
    constructor() {
    }

    reinitGroups() {
        return GroupModelDB.sync({ force: true });
    }

    createGroup(data) {
        return GroupModelDB.create(data);
    }

    getGroup(where) {
        return GroupModelDB.findOne({ where });
    }

    getGroups() {
        return GroupModelDB.findAll();
    }

    updateGroup({ id, data }) {
        const where = { id };
        return GroupModelDB.update({ ...data }, { where, returning: true });
    }

    removeGroup({ id }) {
        const where = { id };
        return GroupModelDB.destroy({ where });
    }
}

export const DAL = new GroupDataAccessLayer();