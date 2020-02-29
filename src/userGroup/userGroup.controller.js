import { userGroupModel } from './userGroup.services';
import { statusCodes, CODES, CustomError, sendResponse } from '../helpers';

export const getAll = async (req, res, next) => {
    try {
        const result = userGroupModel.getAll();
        
        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({
                code: statusCodes[CODES.NOT_FOUND],
                message: 'Users group was not found!',
                service: 'userGroups',
                method: 'getUserGroup',
            });
        }
    } catch (err) {
        next(err);
    }
}

export const getUserGroup = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = userGroupModel.getUserGroup(id);
        
        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({
                code: statusCodes[CODES.NOT_FOUND],
                message: 'Users group was not found!',
                service: 'userGroups',
                method: 'getUserGroup',
            });
        }
    } catch (err) {
        next(err);
    }
}

export const addUsersToGroup = async (req, res, next) => {
    const { groupId, users } = req.body;
    try {
        const result = userGroupModel.addUsersToGroup({ groupId, users })
        
        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: `Users group by id ${groupId} was not found!`,
                service: 'userGroups',
                method: 'addUsersToGroup',
            });
        }
    } catch (err) {
        next(err);
    }
}