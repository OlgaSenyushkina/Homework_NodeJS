import { PORT } from './helpers';
import { homeRouter } from './home';
import { sequelize } from './db';
import { userRouter } from './user';
import { groupRouter } from './group';
import { userGroupRouter } from './userGroup';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app
    .use(bodyParser.json())
    .use('/userGroups', userGroupRouter)
    .use('/groups', groupRouter)
    .use('/users', userRouter)
    .use('/', homeRouter)
    .use((req, res) => {
        res.status(404).send('404 Not Found');
    })
    .listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`);
        sequelize
            .authenticate()
            .then(() => {
                console.log('[sequelize] Our database is working correctly!');
            })
            .catch(err => {
                console.error('[sequelize] Unable to connect to the database:', err);
            });
    });