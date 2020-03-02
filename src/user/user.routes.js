import * as express from 'express';
import { validator } from '../helpers';
import { userModel } from './user.services';
import { 
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
 } from './user.controller';

export const userRouter = express.Router();

userRouter
    .get('/', getUsers)
    .get('/:id', getUser)
    .delete('/:id', deleteUser);

userRouter
    .use(validator.body(userModel.getSchema()))
    .post('/', addUser)
    .put('/:id', updateUser);