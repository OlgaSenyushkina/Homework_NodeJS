import * as express from 'express';
import { validator } from '../helpers';
import { userGroupModel } from './userGroup.services';
import { 
    getAll,
    getUserGroup,
    addUsersToGroup,
} from './userGroup.controller';

export const userGroupRouter = express.Router();

userGroupRouter.route('/')
    .get(getAll)
    .post(validator.body(userGroupModel.getSchema()), addUsersToGroup);

userGroupRouter.route('/:id')
    .get(getUserGroup)