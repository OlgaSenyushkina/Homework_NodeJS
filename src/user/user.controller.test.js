import { 
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
 } from './user.controller';
import { userModel } from './user.services';
import { sendResponse } from '../helpers';

jest.mock('./user.services', () => ({
    userModel: {
        getUsers: jest.fn(({ login }) => {
            if (login === 'error') {
                return Promise.reject(new Error({
                    message: "error",
                }));
            }

            const data = [
                { login: 'ololo' },
                { login: 'prprpr' },
            ];

            if (login) {
                const result = data.filter(item => item.login === login);

                return Promise.resolve(result);
            }

            return Promise.resolve(data);
        }),
        getUserById: jest.fn((id) => {
            if (!id || id === 'error') {
                return Promise.reject(new Error({
                    message: "error",
                }));
            }

            const data = [
                { id: 'fa51300e-2017-4693-94e7-9f25a4b125d1'},
                { id: 'fa51300e-2017-4693-94e7-9f25a4b125d2' },
            ];

            const result = data.find(item => item.id === id);

            return Promise.resolve(result);
        }),
        addNewUser: jest.fn(({ age, login, password }) => {
            if (!age || !login || !password) {
                return Promise.reject(new Error({
                    message: "error",
                }));
            }

            return Promise.resolve({ 
                age,
                login,
                password,
                id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
            });

        }),
        updateUserById: jest.fn((id, { age, login, password }) => {
            if (id === 'error') {
                return Promise.reject(new Error({
                    message: "error",
                }));
            }

            return Promise.resolve({ 
                id,
                age,
                login,
                password,
            });
        }),
        deleteUserById: jest.fn((id) => {
            if (id === 'error') {
                return Promise.reject(new Error({
                    message: "error",
                }));
            }

            return Promise.resolve(`Deleted user by id ${id}!`);
        }),
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

            await getUsers(req, res, next);

            expect(userModel.getUsers).toHaveBeenCalledTimes(1);
            expect(userModel.getUsers).toHaveBeenCalledWith(req.query);
            
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, [{ login: 'ololo' }]);
        });

        it('less login', async () => {
            userModel.getUsers.mockClear();
            sendResponse.mockClear();

            const req = {
                query: { 
                    login: null,
                },
            };
            const res = {};

            await getUsers(req, res, next);

            expect(userModel.getUsers).toHaveBeenCalledTimes(1);
            expect(userModel.getUsers).toHaveBeenCalledWith(req.query);
            
            expect(sendResponse).toHaveBeenCalledTimes(1);
            const users = [
                { login: 'ololo' },
                { login: 'prprpr' },
            ];

            expect(sendResponse).toHaveBeenCalledWith(res, users);
        });

        it('with error', async () => {
            userModel.getUsers.mockClear();
            sendResponse.mockClear();

            const req = { 
                query: {
                    login: 'error',
                },
            };
            const res = {};

            await getUsers(req, res, next);

            expect(userModel.getUsers).toHaveBeenCalledTimes(1);
            expect(userModel.getUsers).toHaveBeenCalledWith(req.query);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('getUser method', () => {
        it('with correct id', async () => {
            sendResponse.mockClear();

            const req = {
                params: { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
            };
            const res = {};

            await getUser(req, res, next);

            expect(userModel.getUserById).toHaveBeenCalledTimes(1);
            expect(userModel.getUserById).toHaveBeenCalledWith(req.params.id);
            
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, req.params);
        });
        it('less id', async () => {
            userModel.getUserById.mockClear();
            sendResponse.mockClear();
            next.mockClear();

            const req = { 
                params: {
                    id: null
                },
            };
            const res = {};

            await getUser(req, res, next);

            expect(userModel.getUserById).toHaveBeenCalledTimes(1);
            expect(userModel.getUserById).toHaveBeenCalledWith(null);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
        it('with error', async () => {
            userModel.getUserById.mockClear();
            sendResponse.mockClear();
            next.mockClear();

            const req = { 
                params: {
                    id: 'error',
                },
            };
            const res = {};

            await getUser(req, res, next);

            expect(userModel.getUserById).toHaveBeenCalledTimes(1);
            expect(userModel.getUserById).toHaveBeenCalledWith('error');
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('addUser method', () => {
        it('with correct data', async () => {
            sendResponse.mockClear();

            const req = {
                body: { 
                    age: 30,
                    login: 'ololo',
                    password: 'ololol123',
                },
            };
            const res = {};

            await addUser(req, res, next);

            expect(userModel.addNewUser).toHaveBeenCalledTimes(1);
            expect(userModel.addNewUser).toHaveBeenCalledWith(req.body);

            const result = {...req.body, id: 'fa51300e-2017-4693-94e7-9f25a4b125d1'};
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, result);
        });
        it('with error', async () => {
            userModel.addNewUser.mockClear();
            sendResponse.mockClear();
            next.mockClear();

            const req = {
                body: { 
                    age: null,
                    login: 'ololo',
                    password: 'ololol123',
                },
            };
            const res = {};

            await addUser(req, res, next);

            expect(userModel.addNewUser).toHaveBeenCalledTimes(1);
            expect(userModel.addNewUser).toHaveBeenCalledWith(req.body);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateUser method', () => {
        it('with correct data', async () => {
            sendResponse.mockClear();

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

            await updateUser(req, res, next);

            expect(userModel.updateUserById).toHaveBeenCalledTimes(1);
            expect(userModel.updateUserById).toHaveBeenCalledWith(req.params.id, req.body);

            const result = {...req.params, ...req.body};
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, result);
        });
        it('with error', async () => {
            userModel.updateUserById.mockClear();
            sendResponse.mockClear();
            next.mockClear();

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

            await deleteUser(req, res, next);

            expect(userModel.deleteUserById).toHaveBeenCalledTimes(1);
            expect(userModel.deleteUserById).toHaveBeenCalledWith(req.params.id);
        });
        it('with error', async () => {
            userModel.deleteUserById.mockClear();
            next.mockClear();

            const req = {
                params: {
                    id: 'error',
                },
            };
            const res = {};

            await deleteUser(req, res, next);

            expect(userModel.deleteUserById).toHaveBeenCalledTimes(1);
            expect(userModel.deleteUserById).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});