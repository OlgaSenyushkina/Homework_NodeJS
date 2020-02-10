import {
    INIT_USERS_DATA,
    CREATE_USERS_TABLE,
    INIT_GROUPS_DATA,
    CREATE_GROUPS_TABLE,
    DROP_GROUPS_TABLE,
    DROP_USERS_TABLE,
    CREATE_USER_GROUPS_TABLE,
    INIT_USER_GROUPS_DATA,
    DROP_USER_GROUPS_TABLE
} from './helpers';
import { sequelize } from './db';

const sendQuery = (message, comment) => sequelize
    .query(message)
    .then(res => {
        console.log(comment, res)
    });

const dropGroupTable = () => sendQuery(DROP_GROUPS_TABLE, 'GROUPS TABLE DROPPED: ');
const initGroupData = () => sendQuery(INIT_GROUPS_DATA, 'GROUPS DATA INPUTTED: ');
const initGroupTable = () => sendQuery(CREATE_GROUPS_TABLE, 'GROUPS TABLE CREATED: ');

const dropUsersTable = () => sendQuery(DROP_USERS_TABLE, 'USERS TABLE DROPPED: ');
const initUsersData = () => sendQuery(INIT_USERS_DATA, 'USERS DATA INPUTTED: ');
const initUsersTable = () => sendQuery(CREATE_USERS_TABLE, 'USERS TABLE CREATED: ');

const dropUsersGroupsTable = () => sendQuery(DROP_USER_GROUPS_TABLE, 'USER GROUPS TABLE DROPPED: ');
const initUsersGroupData = () => sendQuery(INIT_USER_GROUPS_DATA, 'INIT USER GROUPS DATA: ');
const initUserGroupsTable = () => sendQuery(CREATE_USER_GROUPS_TABLE, 'USERS GROUPS TABLE CREATED: ');


dropUsersTable()
    .then(dropGroupTable)
    .then(dropUsersGroupsTable)
    .then(initUsersTable)
    .then(initGroupTable)
    .then(initUserGroupsTable)
    .then(initGroupData)
    .then(initUsersData)
    .then(initUsersGroupData)
    .catch(e => {
        console.error(e.stack)
    });