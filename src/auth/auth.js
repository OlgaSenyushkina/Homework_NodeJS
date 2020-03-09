import uuid from 'uuid/v4';
import * as express from 'express';
import passport from 'passport';
import { checkCredentials } from './auth.controller';

export const authRouter = express.Router();

authRouter
    .post('/', checkCredentials);
