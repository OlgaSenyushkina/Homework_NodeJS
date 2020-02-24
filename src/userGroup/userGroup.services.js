import { userGroupSchema } from './userGroup.schema';
import { DAL } from './userGroup.DAL';
import { sequelize } from '../db';
import { statusCodes } from '../helpers/const';

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
        if (!users || !groupId) {
            throw new CustomError({
                code: statusCodes[CODES.BAD_DATA],
                message: `${!users ? 'users' : 'groupId'} value error!`,
                service: 'userGroup',
                method: 'addUsersToGroup',
            });
        }

        try {
            const transaction = await sequelize.transaction();

            for (let i = 0; i < users.length; i++) {
                const userId = users[i];
                const params = { groupId, userId };
                const foundUserInGroup = await this.getUserGroup({ params });
                
                if (foundUserInGroup) {
                    throw new CustomError({
                        code: statusCodes[CODES.BAD_DATA],
                        message: `Users didn't add to group. This group has user ID ${userId}`,
                        service: 'userGroup',
                        method: 'addUsersToGroup',
                    });
                };
    
                DAL.addUserToGroup({ ...params }, transaction);
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            if (error.code) {
                throw error;
            }

            throw new CustomError({
                message: error.message,
                service: 'userGroup',
                method: 'addUsersToGroup',
            }); 
        }

        return result;
    }
}

export const userGroupModel = new UserGroup(userGroupSchema);