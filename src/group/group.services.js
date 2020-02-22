import uuid from 'uuid/v4';
import { userModel } from '../user';
import { userGroupModel } from '../userGroup';
import { groupSchema } from './group.schema';
import { DAL } from './group.DAL';

class Group {
    constructor(schema) {
        this.schema = schema;

        // this.reinitDB(); // uncomment to clear table with data
    }

    reinitDB() {
        return DAL.reinitGroups();
    }

    getSchema() {
        return this.schema;
    }

    async createGroup(data) {
        const foundedGroup = await this.getGroup({ name: data.name });

        if (foundedGroup) return null;

        return DAL.createGroup({ ...data, id: uuid() });
    }

    getAllGroups() {
        return DAL.getGroups();
    }

    getGroup(where) {
        return DAL.getGroup(where);
    }

    async getGroupById(id) {
        return this.getGroup({ id });
    }

    async updateGroupById(id, data) {
        const group = await this.getGroup({ id });

        if (!group) return null;
            
        const result = await DAL.updateGroup({ id, data });

        return result[result.length - 1][0];
    }

    async removeGroupById(id) {
        const group = await this.getGroup({ id });
        
        if (!group) return false;
            
        const result = DAL.removeGroup( { id });

        return !!result;
    }

}

export const groupModel = new Group(groupSchema);