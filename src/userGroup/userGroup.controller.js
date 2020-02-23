import { userGroupModel } from './userGroup.services';
import { CustomError } from '../helpers/errorsHandler';

export const getAll = async (req, res) => {
    try {
        const result = userGroupModel.getAll()
        res.json(result);
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'userGroups',
            method: 'getAll',
        });
    }
}

export const getUserGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const result = userGroupModel.getUserGroup(id)
        if (result) {
            res.send(result);
        } else {
            throw new CustomError({
                code: 404,
                message: 'Users group was not found!',
                service: 'userGroups',
                method: 'getUserGroup',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'userGroups',
            method: 'getUserGroup',
        });
    }
}

export const addUsersToGroup = async (req, res) => {
    const { groupId, users } = req.body;
    try {
        const result = userGroupModel.addUsersToGroup({ groupId, users })
        if (result) {
            res.send(result);
        } else {
            throw new CustomError({ 
                code: 404,
                message: `Users group by id ${groupId} was not found!`,
                service: 'userGroups',
                method: 'addUsersToGroup',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'userGroups',
            method: 'addUsersToGroup',
        });
    }
}