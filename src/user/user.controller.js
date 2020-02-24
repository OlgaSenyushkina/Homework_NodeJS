import { userModel } from './user.services';
import { statusCodes, CODES } from '../helpers/const';
import { CustomError } from '../helpers/errorsHandler';

export const getUsers = async (req, res) => {
    const { login, limit } = req.query;
    try {
        const result = await userModel.getUsers({ login, limit })
        res.json(result)
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'users',
            method: 'getUsers',
        });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userModel.getUserById(id)
        if (result) {
            res.send(result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'User was not found!',
                service: 'users',
                method: 'getUser',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'users',
            method: 'getUser',
        });
    }
}

export const addUser = async (req, res) => {
    const { age, login, password } = req.body;
    try {
        const result = await userModel.addNewUser({ age, login, password })
        if (result) {
            res.send(result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: 'User with this login already exists!',
                service: 'users',
                method: 'addUser',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'users',
            method: 'addUser',
        });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    try {
        const result = await userModel.updateUserById(id, { login, password, age })
        if (result) {
            res.send(result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.NOT_FOUND],
                message: `User by id ${id} was not found!`,
                service: 'users',
                method: 'updateUser',
            });
        }
    } catch (error) {
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'users',
            method: 'updateUser',
        });
    }
}

export const deleteUser = async(req, res) => {
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
    } catch (error) {
        console.log('err> ', error);
        if (error.code) {
            throw error;
        }
        throw new CustomError({
            message: error.message,
            service: 'users',
            method: 'deleteUser',
        });
    }
}