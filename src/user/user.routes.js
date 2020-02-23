import * as express from 'express';
import { validator } from '../helpers';
import { userModel } from './user.services';
import { userController } from './user.controller';
import { errorsHandler } from '../helpers/errorsHandler';

export const userRouter = express.Router();

userRouter.route('/')
    .get(userController.getUsers)
    .post(validator.body(userModel.getSchema()), userController.addUser)
    .use(errorsHandler);

userRouter.route('/:id')
    .get(userController.getUser)
    .put(validator.body(userModel.getSchema()), userController.updateUser)
    .delete(userController.deleteUser)
    .use(errorsHandler);