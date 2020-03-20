import { 
    addGroup,
    getAllGroups,
    getGroup,
    updateGroup,
    deleteGroup,
 } from './group.controller';
import { groupModel } from './group.services';
import { sendResponse } from '../helpers';

const FAKE_ERROR = new Error({
    message: 'error',
});

jest.mock('./group.services', () => ({
    groupModel: {
        createGroup: jest.fn(),
        getAllGroups: jest.fn(),
        getGroupById: jest.fn(),
        updateGroupById: jest.fn(),
        removeGroupById: jest.fn(),
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

            const mockResult = {...req.body, id: 'fa51300e-2017-4693-94e7-9f25a4b125d1'};
            
            groupModel.createGroup = jest.fn().mockResolvedValue(mockResult);

            await addGroup(req, res, next);

            expect(groupModel.createGroup).toHaveBeenCalledTimes(1);
            expect(groupModel.createGroup).toHaveBeenCalledWith(req.body);
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });

        it('less permissions', async () => {
            const req = {
                body: { 
                    name: 'ololo',
                    permissions: [],
                },
            };
            const res = {};

            groupModel.createGroup = jest.fn().mockRejectedValue(FAKE_ERROR);

            await addGroup(req, res, next);

            expect(groupModel.createGroup).toHaveBeenCalledTimes(1);
            expect(groupModel.createGroup).toHaveBeenCalledWith(req.body);
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('with error', async () => {
            const req = {
                body: { 
                    name: 'error',
                    permissions: ['DELETE', 'WRITE'],
                },
            };
            const res = {};

            groupModel.createGroup = jest.fn().mockRejectedValue(FAKE_ERROR);

            await addGroup(req, res, next);

            expect(groupModel.createGroup).toHaveBeenCalledTimes(1);
            expect(groupModel.createGroup).toHaveBeenCalledWith(req.body);
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('getAllGroups method', () => {
        it('with correct result', async () => {
            const res = {};
            const mockResult = [
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

            groupModel.getAllGroups = jest.fn().mockResolvedValue(mockResult);

            await getAllGroups({}, res, next);

            expect(groupModel.getAllGroups).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });
    });

    describe('getGroup method', () => {
        it('with correct id', async () => {
            const req = {
                params: {
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
            };
            const res = {};
            const mockResult = { 
                id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                name: 'ololo',
                permissions: ['DELETE', 'WRITE'],
            };

            groupModel.getGroupById = jest.fn().mockResolvedValue(mockResult);

            await getGroup(req, res, next);

            expect(groupModel.getGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.getGroupById).toHaveBeenCalledWith(req.params.id);
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });

        it('with error', async () => {
            const req = {
                params: {
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d3',
                },
            };
            const res = {};

            groupModel.getGroupById = jest.fn().mockRejectedValue(FAKE_ERROR);

            await getGroup(req, res, next);

            expect(groupModel.getGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.getGroupById).toHaveBeenCalledWith(req.params.id);
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateGroup method', () => {
        it('with correct id', async () => {
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
            const mockResult = { 
                id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                name: 'ololo',
                permissions: ['READ'],
            };
            groupModel.updateGroupById = jest.fn().mockResolvedValue(mockResult);

            await updateGroup(req, res, next);

            expect(groupModel.updateGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.updateGroupById).toHaveBeenCalledWith(req.params.id, req.body);
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });

        it('with error', async () => {
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

            groupModel.updateGroupById = jest.fn().mockRejectedValue(FAKE_ERROR);

            await updateGroup(req, res, next);

            expect(groupModel.updateGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.updateGroupById).toHaveBeenCalledWith(req.params.id, req.body);
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('deleteGroup method', () => {
        it('with correct id', async () => {
            const req = {
                params: { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d1',
                },
            };
            const res = {};
            const mockResult = `Deleted group by id ${req.params.id}!`;

            groupModel.removeGroupById = jest.fn().mockResolvedValue(mockResult);

            await deleteGroup(req, res, next);

            expect(groupModel.removeGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.removeGroupById).toHaveBeenCalledWith(req.params.id);
            expect(sendResponse).toHaveBeenCalledTimes(1);
            expect(sendResponse).toHaveBeenCalledWith(res, mockResult);
        });

        it('with error', async () => {
            const req = {
                params: { 
                    id: 'fa51300e-2017-4693-94e7-9f25a4b125d3',
                },
            };
            const res = {};

            groupModel.removeGroupById = jest.fn().mockRejectedValue(FAKE_ERROR);

            await deleteGroup(req, res, next);

            expect(groupModel.removeGroupById).toHaveBeenCalledTimes(1);
            expect(groupModel.removeGroupById).toHaveBeenCalledWith(req.params.id);
            expect(sendResponse).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});