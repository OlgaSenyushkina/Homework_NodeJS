import { 
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
 } from './user.controller';
import { userModel } from './user.services';
import { sendResponse } from '../helpers';

const FAKE_ERROR = new Error({
    message: "error",
});

jest.mock('./user.services', () => ({
    userModel: {
        getUsers: jest.fn(),
        getUserById: jest.fn(),
        addNewUser: jest.fn(),
        updateUserById: jest.fn(),
        deleteUserById: jest.fn(),
    },
}));

jest.mock('../helpers', () => ({ 
    sendResponse: jest.fn(),
 }));

const next = jest.fn();

describe('user.controller', () => {
    describe('getUsers method', () => {
        it('with correct login', async () => {
            const req = {
                query: { 
                    login: 'ololo',
                },
            };
            const res = {};
            const mockResult = [req.query];
            userModel.getUsers = jest.fn().mockResolvedValue(mockResult);

            await getUsers(req, res, next);

            expect(userModel.getUsers).toHaveBeenCalledTimes(1);
            expect(userModel.getUsers).toHaveBeenCalledWith(req.query);
            
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });

        it('less login', async () => {
            const req = {
                query: { 
                    login: null,
                },
            };
            const res = {};
            const mockResult = [
                { login: 'ololo' },
                { login: 'prprpr' },
            ];
            userModel.getUsers = jest.fn().mockResolvedValue(mockResult);

            await getUsers(req, res, next);

            expect(userModel.getUsers).toHaveBeenCalledTimes(1);
            expect(userModel.getUsers).toHaveBeenCalledWith(req.query);
            
            expect(sendResponse).toHaveBeenCalledTimes(1);

            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });

        it('with error', async () => {
            const req = { 
                query: {
                    login: 'error',
                },
            };
            const res = {};

            userModel.getUsers = jest.fn().mockRejectedValue(FAKE_ERROR);

            await getUsers(req, res, next);

            expect(userModel.getUsers).toHaveBeenCalledTimes(1);
            expect(userModel.getUsers).toHaveBeenCalledWith(req.query);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('getUser method', () => {
        it('with correct id', async () => {
            const req = {
                params: { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
            };
            const res = {};

            userModel.getUserById = jest.fn().mockResolvedValue(req.params);

            await getUser(req, res, next);

            expect(userModel.getUserById).toHaveBeenCalledTimes(1);
            expect(userModel.getUserById).toHaveBeenCalledWith(req.params.id);
            
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, req.params);
        });

        it('less id', async () => {
            const req = { 
                params: {
                    id: null
                },
            };
            const res = {};

            userModel.getUserById = jest.fn().mockRejectedValue(FAKE_ERROR);

            await getUser(req, res, next);

            expect(userModel.getUserById).toHaveBeenCalledTimes(1);
            expect(userModel.getUserById).toHaveBeenCalledWith(null);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('with error', async () => {
            const req = { 
                params: {
                    id: 'error',
                },
            };
            const res = {};

            userModel.getUserById = jest.fn().mockRejectedValue(FAKE_ERROR);

            await getUser(req, res, next);

            expect(userModel.getUserById).toHaveBeenCalledTimes(1);
            expect(userModel.getUserById).toHaveBeenCalledWith('error');
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('addUser method', () => {
        it('with correct data', async () => {
            const req = {
                body: { 
                    age: 30,
                    login: 'ololo',
                    password: 'ololol123',
                },
            };
            const res = {};
            const mockResult = {...req.body, id: 'fa51300e-2017-4693-94e7-9f25a4b125d1'};
            
            userModel.addNewUser = jest.fn().mockResolvedValue(mockResult);

            await addUser(req, res, next);

            expect(userModel.addNewUser).toHaveBeenCalledTimes(1);
            expect(userModel.addNewUser).toHaveBeenCalledWith(req.body);

            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });

        it('with error', async () => {
            const req = {
                body: { 
                    age: null,
                    login: 'ololo',
                    password: 'ololol123',
                },
            };
            const res = {};

            userModel.addNewUser = jest.fn().mockRejectedValue(FAKE_ERROR);

            await addUser(req, res, next);

            expect(userModel.addNewUser).toHaveBeenCalledTimes(1);
            expect(userModel.addNewUser).toHaveBeenCalledWith(req.body);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateUser method', () => {
        it('with correct data', async () => {
            const req = {
                params: {
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
                body: { 
                    age: 30,
                    login: 'ololo',
                    password: 'ololol123',
                },
            };
            const res = {};
            const mockResult = {...req.params, ...req.body};
            
            userModel.updateUserById = jest.fn().mockResolvedValue(mockResult);

            await updateUser(req, res, next);

            expect(userModel.updateUserById).toHaveBeenCalledTimes(1);
            expect(userModel.updateUserById).toHaveBeenCalledWith(req.params.id, req.body);

            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });

        it('with error', async () => {
            const req = {
                params: {
                    id: 'error',
                },
                body: { 
                    age: 30,
                    login: 'ololo',
                    password: 'ololol123',
                },
            };
            const res = {};

            userModel.updateUserById = jest.fn().mockRejectedValue(FAKE_ERROR);

            await updateUser(req, res, next);

            expect(userModel.updateUserById).toHaveBeenCalledTimes(1);
            expect(userModel.updateUserById).toHaveBeenCalledWith(req.params.id, req.body);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('deleteUser method', () => {
        it('with correct id', async () => {
            const req = {
                params: {
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
            };
            const res = {};
            const mockResult = `Deleted user by id ${req.params.id}!`;

            userModel.deleteUserById = jest.fn().mockResolvedValue(mockResult);

            await deleteUser(req, res, next);

            expect(userModel.deleteUserById).toHaveBeenCalledTimes(1);
            expect(userModel.deleteUserById).toHaveBeenCalledWith(req.params.id);
        });

        it('with error', async () => {
            const req = {
                params: {
                    id: 'error',
                },
            };
            const res = {};

            userModel.deleteUserById = jest.fn().mockRejectedValue(FAKE_ERROR);

            await deleteUser(req, res, next);

            expect(userModel.deleteUserById).toHaveBeenCalledTimes(1);
            expect(userModel.deleteUserById).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});