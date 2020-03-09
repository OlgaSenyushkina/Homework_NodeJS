import { PORT, errorsHandler, validationErrorHandler } from './helpers';
import { homeRouter } from './home';
import { sequelize } from './db';
import { userRouter } from './user';
import { groupRouter } from './group';
import { authRouter, checkIfUserAuthorized } from './auth';
import { userGroupRouter } from './userGroup';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';


const app = express();

app
    .use(bodyParser.json())
    .use(passport.initialize())
    .use('/auth', authRouter)
    .use('/userGroups', checkIfUserAuthorized, userGroupRouter)
    .use('/groups', checkIfUserAuthorized, groupRouter)
    .use('/users', checkIfUserAuthorized, userRouter)
    .use('/', checkIfUserAuthorized, homeRouter)
    .use(validationErrorHandler)
    .use(errorsHandler)
    
    .listen(PORT, async () => {
        console.log(`Example app listening on port ${PORT}!`);
        try {
            sequelize.authenticate();

            console.log('[sequelize] Our database is working correctly!');
        } catch(e) {
                console.error('[sequelize] Unable to connect to the database:', e);
        };
    });