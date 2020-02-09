import {
    INIT_USERS_DATA,
    CREATE_USERS_TABLE,
    INIT_GROUPS_DATA,
    CREATE_GROUPS_TABLE,
    DROP_GROUPS_TABLE,
    DROP_USERS_TABLE,
} from './helpers';
import { sequelize } from './db';

const sendQuery = (message, comment) => sequelize
    .query(message)
    .then(res => {
        console.log(comment, res)
    });

const initGroupData = () => sendQuery(INIT_GROUPS_DATA, 'GROUPS DATA INPUTTED: ');
const initGroupTable = () => sendQuery(CREATE_GROUPS_TABLE, 'GROUPS TABLE CREATED: ');

const initUsersData = () => sendQuery(INIT_USERS_DATA, 'USERS DATA INPUTTED: ');
const initUsersTable = () => sendQuery(CREATE_USERS_TABLE, 'USERS TABLE CREATED: ');

const dropGroupTable = () => sendQuery(DROP_GROUPS_TABLE, 'GROUPS TABLE DROPPED: ');
const dropUsersTable = () => sendQuery(DROP_USERS_TABLE, 'USERS TABLE DROPPED: ');

dropUsersTable()
    .then(dropGroupTable)
    .then(initUsersTable)
    .then(initUsersData)
    .then(initGroupTable)
    .then(initGroupData)
    .catch(e => {
        console.error(e.stack)
    });