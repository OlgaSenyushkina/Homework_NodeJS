import { PORT } from './helpers';
import { homeRouter } from './home';
import { sequelize } from './db';
import { userRouter } from './user';
import { groupRouter } from './group';
import { userGroupRouter } from './userGroup';
import { logErrors, errorsHandler } from './helpers/errorsHandler';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app
    .use(bodyParser.json())
    .use('/userGroups', userGroupRouter)
    .use('/groups', groupRouter)
    .use('/users', userRouter)
    .use('/', homeRouter)
    .use(logErrors)
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