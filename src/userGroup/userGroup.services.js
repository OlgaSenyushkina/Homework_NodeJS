import { userGroupSchema } from './userGroup.schema';
import { DAL } from './userGroup.DAL';
import { sequelize } from '../db';

class UserGroup {
    constructor(schema) {
        this.schema = schema;

        // this.reinitDB(); // uncomment to clear table with data
    }

    reinitDB() {
        return DAL.reinitUserGroups();
    }

    getSchema() {
        return this.schema;
    }

    async getAll() {
        return DAL.getAll();
    }

    async getUserGroup(params) {
        return DAL.getUserGroup(params);
    }

    async addUsersToGroup({ groupId, users }) {
        if (!users) return 'users value error!';
        if (!groupId) return 'groupId value error!';
        let transaction = await sequelize.transaction();

        let result = 'All users add to group';
        try {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const params = {
                    groupId,
                    userId: user,
                };
                const foundUserInGroup = await this.getUserGroup({ params });
                
                if (foundUserInGroup) {
                    result = `Users didn't add to group. This group has user ID ${params.userId}`;
                    throw Error(result);
                };
                
    
                DAL.addUserToGroup({ ...params }, transaction);
            }

            await transaction.commit();
        } catch(e) {
            await transaction.rollback();
        }
        

        return result;
    }
}

export const userGroupModel = new UserGroup(userGroupSchema);