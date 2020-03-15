import { userModel } from './user.services';
import { statusCodes, CODES, CustomError, sendResponse } from '../helpers';

export const getUsers = async (req, res, next) => {
    const { login, limit } = req.query;
    
    try {
        const result = await userModel.getUsers({ login, limit });
        sendResponse(res, result);
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await userModel.getUserById(id);

        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'User was not found!',
                service: 'users',
                method: 'getUser',
            });
        }
    } catch (err) {
        next(err);
    }
}

export const addUser = async (req, res, next) => {
    const { age, login, password } = req.body;
    try {
        const result = await userModel.addNewUser({ age, login, password })
        
        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'User with this login already exists!',
                service: 'users',
                method: 'addUser',
            });
        }
    } catch(error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    try {
        const result = await userModel.updateUserById(id, { login, password, age });

        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: `User by id ${id} was not found!`,
                service: 'users',
                method: 'updateUser',
            });
        }
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async(req, res, next) => {
    const { id } = req.params;
    try {
        const result = await userModel.deleteUserById(id);
        
        if (result) {
            res.send(`Deleted user by id ${id}!`);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: `User by id ${id} was not found!`,
                service: 'users',
                method: 'deleteUser',
            });
        }
    } catch (err) {
        next(err);
    }
}