import { groupModel } from './group.services';
import { statusCodes, CODES, sendResponse, CustomError } from '../helpers';

export const addGroup = async (req, res, next) => {
    const { name, permissions } = req.body;
    
    try {
        const result = await groupModel.createGroup({ name, permissions });

        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'Group with this name already exists!',
                service: 'groups',
                method: 'addGroup',
            });
        }
    } catch (err) {
        next(err);
    }
}

export const getAllGroups = async (req, res, next) => {
    try {
        const result = await groupModel.getAllGroups();
        sendResponse(res, result);
    } catch (err) {
        next(err);
    }
}

export const getGroup = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await groupModel.getGroupById(id)
        
        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'Group was not found!',
                service: 'groups',
                method: 'getGroup',
            });
        }
    } catch (err) {
        next(err);
    }
}

export const updateGroup = async (req, res, next) => {
    const { id } = req.params;
    const { name, permissions } = req.body;
    try {
        const result = await groupModel.updateGroupById(id, { name, permissions })
        
        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: `Group by id ${id} was not found!`,
                service: 'groups',
                method: 'updateGroup',
            });
        }
    } catch (err) {
        next(err);
    }
}

export const deleteGroup = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await groupModel.removeGroupById(id);
        
        if (result) {
            sendResponse(res, result || `Deleted group by id ${id}!`);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: `Group by id ${id} was not found!`,
                service: 'groups',
                method: 'deleteGroup',
            });
        }
    } catch (err) {
        next(err);
    }
}