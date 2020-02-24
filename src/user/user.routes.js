import * as express from 'express';
import { validator } from '../helpers';
import { handleRouterErrors } from '../helpers/errorsHandler';
import { userModel } from './user.services';
import { 
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
 } from './user.controller';

export const userRouter = express.Router();

userRouter.route('/')
    .get(handleRouterErrors(getUsers))
    .post(validator.body(userModel.getSchema()), handleRouterErrors(addUser))

userRouter.route('/:id')
    .get(handleRouterErrors(getUser))
    .put(validator.body(userModel.getSchema()), handleRouterErrors(updateUser))
    .delete(handleRouterErrors(deleteUser));
    