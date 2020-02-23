import { groupModel } from './group.services';
import { statusCodes } from '../helpers/const';

export const addGroup = async (req, res) => {
    const { name, permissions } = req.body;
    
    try {
        const group = await groupModel.createGroup({ name, permissions })

        if (group) {
            res.send(group);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'Group with this name already exists!',
                service: 'groups',
                method: 'addGroup',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'groups',
            method: 'addGroup',
        });
    }
}

export const getAllGroups = async (req, res) => {
    try {
        const groups = groupModel.getAllGroups()
        res.json(groups)
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'groups',
            method: 'getAllGroups',
        });
    }
}

export const getGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const group = await groupModel.getGroupById(id)
        
        if (group) {
            res.send(group);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'Group was not found!',
                service: 'groups',
                method: 'getGroup',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'groups',
            method: 'getGroup',
        });
    }
}

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;
    try {
        const result = await groupModel.updateGroupById(id, { name, permissions })
        
        if (result) {
            res.send(result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: `Group by id ${id} was not found!`,
                service: 'groups',
                method: 'updateGroup',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'groups',
            method: 'updateGroup',
        });
    }
}

export const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const result = groupModel.removeGroupById(id)
        
        if (result) {
            res.send(`Deleted group by id ${id}!`);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: `Group by id ${id} was not found!`,
                service: 'groups',
                method: 'deleteGroup',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'groups',
            method: 'deleteGroup',
        });
    }
}