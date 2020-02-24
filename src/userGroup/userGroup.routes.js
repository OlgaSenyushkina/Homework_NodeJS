import * as express from 'express';
import { validator } from '../helpers';
import { handleRouterErrors } from '../helpers/errorsHandler';
import { userGroupModel } from './userGroup.services';
import { 
    getAll,
    getUserGroup,
    addUsersToGroup,
} from './userGroup.controller';

export const userGroupRouter = express.Router();

userGroupRouter.route('/')
    .get(handleRouterErrors(getAll))
    .post(validator.body(userGroupModel.getSchema()), handleRouterErrors(addUsersToGroup));

userGroupRouter.route('/:id')
    .get(handleRouterErrors(getUserGroup))