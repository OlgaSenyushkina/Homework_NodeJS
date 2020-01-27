import { UserModelDB } from './user.model';


export const initUsers = (payload) => UserModelDB.sync(payload);

export const findUser = (payload) => UserModelDB.findOne(payload);

export const findUsers = (payload) => UserModelDB.findAll(payload);

export const createUser = (payload) => UserModelDB.create(payload);

export const updateUser = (payload) => UserModelDB.update(payload);
