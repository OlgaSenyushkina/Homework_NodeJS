import * as express from 'express';
import { validator } from '../helpers';
import { handleRouterErrors } from '../helpers/errorsHandler';
import { groupModel } from './group.services';
import { 
    getAllGroups,
    getGroup,
    addGroup,
    updateGroup,
    deleteGroup,
} from './group.controller';

export const groupRouter = express.Router();

groupRouter.route('/')
    .get(handleRouterErrors(getAllGroups))
    .post(validator.body(groupModel.getSchema()), handleRouterErrors(addGroup));

groupRouter.route('/:id')
    .get(handleRouterErrors(getGroup))
    .put(validator.body(groupModel.getSchema()), handleRouterErrors(updateGroup))
    .delete(handleRouterErrors(deleteGroup));