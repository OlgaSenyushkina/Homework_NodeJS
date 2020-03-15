import { 
    addGroup,
    getAllGroups,
    getGroup,
    updateGroup,
    deleteGroup,
 } from './group.controller';
import { groupModel } from './group.services';
import { sendResponse } from '../helpers';

jest.mock('./group.services', () => ({
    groupModel: {
        createGroup: jest.fn(({ name, permissions }) => {
            const isCorrectPermissions = permissions.some(item => (
                item === 'READ'
                || item === 'WRITE'
                || item === 'DELETE'
                || item === 'SHARE'
                || item === 'UPLOAD_FILES' 
            ));
            if (!isCorrectPermissions || name === 'error') {
                return Promise.reject(new Error({
                    message: 'error',
                }));
            }

            return Promise.resolve({ 
                name,
                permissions,
                id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
            });
        }),
        getAllGroups: jest.fn(() => {
            const groups = [
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                    name: 'ololo',
                    permissions: ['DELETE', 'WRITE'],
                },
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d2',
                    name: 'prprpr',
                    permissions: ['READ'],
                }
            ];

            return Promise.resolve(groups);
        }),
        getGroupById: jest.fn((id) => {
            if (!id || id === 'error') {
                return Promise.reject(new Error({
                    message: 'error',
                }));
            }

            const groups = [
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                    name: 'ololo',
                    permissions: ['DELETE', 'WRITE'],
                },
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d2',
                    name: 'prprpr',
                    permissions: ['READ'],
                }
            ];

            const result = groups.find(item => item.id === id);

            if (!result) {
                return Promise.reject(new Error({
                    message: 'Group was not found!',
                }));
            }

            return Promise.resolve(result);
        }),
        updateGroupById: jest.fn((id, { name, permissions }) => {
            const groups = [
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                    name: 'ololo',
                    permissions: ['DELETE', 'WRITE'],
                },
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d2',
                    name: 'prprpr',
                    permissions: ['READ'],
                }
            ];

            const result = groups.find(item => item.id === id);

            const isCorrectPermissions = permissions.some(item => (
                item === 'READ'
                || item === 'WRITE'
                || item === 'DELETE'
                || item === 'SHARE'
                || item === 'UPLOAD_FILES' 
            ));


            if (!result || !isCorrectPermissions) {
                return Promise.reject(new Error({
                    message: 'error',
                }));
            }

            return Promise.resolve({ id, name, permissions });
        }),
        removeGroupById: jest.fn((id) => {
            const groups = [
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                    name: 'ololo',
                    permissions: ['DELETE', 'WRITE'],
                },
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d2',
                    name: 'prprpr',
                    permissions: ['READ'],
                }
            ];

            const result = groups.find(item => item.id === id);

            if (!result) {
                return Promise.reject(new Error({
                    message: 'error',
                }));
            }

            return Promise.resolve(`Deleted group by id ${id}!`);
        }),
    },
}));

jest.mock('../helpers', () => ({
    sendResponse: jest.fn(),
}));

const next = jest.fn();

describe('group.controller', () => {
    describe('addGroup method', () => {
        it('with correct body', async () => {
            const req = {
                body: { 
                    name: 'ololo',
                    permissions: ['DELETE', 'WRITE'],
                },
            };
            const res = {};

            await addGroup(req, res, next);

            expect(groupModel.createGroup).toHaveBeenCalledTimes(1);
            expect(groupModel.createGroup).toHaveBeenCalledWith(req.body);
            
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, {...req.body, id: 'fa51300e-2017-4693-94e7-9f25a4b125d1'});
        });
        it('less permissions', async () => {
            groupModel.createGroup.mockClear();
            sendResponse.mockClear();

            const req = {
                body: { 
                    name: 'ololo',
                    permissions: [],
                },
            };
            const res = {};

            await addGroup(req, res, next);

            expect(groupModel.createGroup).toHaveBeenCalledTimes(1);
            expect(groupModel.createGroup).toHaveBeenCalledWith(req.body);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
        it('with error', async () => {
            groupModel.createGroup.mockClear();
            sendResponse.mockClear();
            next.mockClear();

            const req = {
                body: { 
                    name: 'error',
                    permissions: ['DELETE', 'WRITE'],
                },
            };
            const res = {};

            await addGroup(req, res, next);

            expect(groupModel.createGroup).toHaveBeenCalledTimes(1);
            expect(groupModel.createGroup).toHaveBeenCalledWith(req.body);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('getAllGroups method', () => {
        it('with correct result', async () => {
            sendResponse.mockClear();
            groupModel.getAllGroups.mockClear();
            const res = {};

            await getAllGroups({}, res, next);

            expect(groupModel.getAllGroups).toHaveBeenCalledTimes(1);
            
            const result = [
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                    name: 'ololo',
                    permissions: ['DELETE', 'WRITE'],
                },
                { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d2',
                    name: 'prprpr',
                    permissions: ['READ'],
                }
            ];
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, result);
        });
    });
    describe('getGroup method', () => {
        it('with correct id', async () => {
            sendResponse.mockClear();

            const req = {
                params: {
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
            };
            const res = {};

            await getGroup(req, res, next);

            expect(groupModel.getGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.getGroupById).toHaveBeenCalledWith(req.params.id);
            
            const result = { 
                id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                name: 'ololo',
                permissions: ['DELETE', 'WRITE'],
            };
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, result);
        });
        it('with error', async () => {
            groupModel.getGroupById.mockClear();
            sendResponse.mockClear();
            next.mockClear();

            const req = {
                params: {
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d3',
                },
            };
            const res = {};

            await getGroup(req, res, next);

            expect(groupModel.getGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.getGroupById).toHaveBeenCalledWith(req.params.id);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
    describe('updateGroup method', () => {
        it('with correct id', async () => {
            sendResponse.mockClear();
            const req = {
                params: { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
                body: {
                    name: 'ololo',
                    permissions: ['READ'],
                },
            };
            const res = {};

            await updateGroup(req, res, next);

            expect(groupModel.updateGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.updateGroupById).toHaveBeenCalledWith(req.params.id, req.body);
            
            const result = { 
                id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                name: 'ololo',
                permissions: ['READ'],
            };
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, result);
        });
        it('with error', async () => {
            groupModel.updateGroupById.mockClear();
            sendResponse.mockClear();
            next.mockClear();
            const req = {
                params: { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
                body: {
                    name: 'ololo',
                    permissions: ['NO_PERMISSOINS'],
                },
            };
            const res = {};

            await updateGroup(req, res, next);

            expect(groupModel.updateGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.updateGroupById).toHaveBeenCalledWith(req.params.id, req.body);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
    describe('deleteGroup method', () => {
        it('with correct id', async () => {
            sendResponse.mockClear();
            const req = {
                params: { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
            };
            const res = {};

            await deleteGroup(req, res, next);

            expect(groupModel.removeGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.removeGroupById).toHaveBeenCalledWith(req.params.id);
            
            const result = `Deleted group by id ${req.params.id}!`;
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, result);
        });
        it('with error', async () => {
            groupModel.removeGroupById.mockClear();
            sendResponse.mockClear();
            next.mockClear();
            const req = {
                params: { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d3',
                },
            };
            const res = {};

            await deleteGroup(req, res, next);

            expect(groupModel.removeGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.removeGroupById).toHaveBeenCalledWith(req.params.id);
            
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});