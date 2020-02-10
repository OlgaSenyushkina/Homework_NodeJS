import * as validation from 'express-joi-validation';

export const validator = validation.createValidator({});

export const PORT = 3000;

export const REG_EXP_PERMISSION = /^(READ|WRITE|DELETE|SHARE|UPLOAD_FILES)$/;
export const REG_EXP_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)(.*[a-zA-Z0-9]{3,15})$/;
export const MAX_PASSWORD = 15;
export const MIN_PASSWORD = 3;
export const MAX_AGE = 130;
export const MIN_AGE = 4;
export const LIMIT_USERS = 5;

export const DROP_USERS_TABLE = 'DROP TABLE IF EXISTS "users" CASCADE';

export const CREATE_USERS_TABLE = 'CREATE TABLE IF NOT EXISTS "users" ("id" UUID NOT NULL , "login" VARCHAR(255) NOT NULL, "password" VARCHAR(255) NOT NULL, "age" INTEGER NOT NULL, "isDeleted" BOOLEAN NOT NULL, PRIMARY KEY ("id"));'

export const INIT_USERS_DATA = `INSERT INTO "users" ("id","login","password","age","isDeleted") VALUES 
    ('39b3f092-d285-4715-bd6e-4c16dcf2caa5', 'user4561', 'usahword1', 44, false),
    ('39b3f092-d285-4715-bd6e-4c16dcf2caa6', 'user4562', 'usahword2', 45, false),
    ('39b3f092-d285-4715-bd6e-4c16dcf2caa8', 'user4563', 'usahword3', 46, false)
;`;


export const DROP_GROUPS_TABLE = 'DROP TABLE IF EXISTS "groups" CASCADE';

export const CREATE_GROUPS_TABLE = 'CREATE TABLE IF NOT EXISTS "groups" ("id" UUID NOT NULL , "name" VARCHAR(255) NOT NULL, "permissions" VARCHAR(255) NOT NULL, PRIMARY KEY ("id"));'

export const INIT_GROUPS_DATA = `INSERT INTO "groups" ("id","name","permissions") VALUES 
    ('39b3f092-d285-4715-bd6e-4c16dcf2caa3', 'readGroup', 'READ'),
    ('39b3f092-d285-4715-bd6e-4c16dcf2caa9', 'writeGroup', 'WRITE')
;`;


export const DROP_USER_GROUPS_TABLE = 'DROP TABLE IF EXISTS "UserGroups" CASCADE';

export const CREATE_USER_GROUPS_TABLE = `CREATE TABLE IF NOT EXISTS "UserGroups" (
    "id" UUID NOT NULL,
    "groupId" UUID NOT NULL REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "userId" UUID NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE ("groupId", "userId"),
    PRIMARY KEY ("id")
);`;

export const INIT_USER_GROUPS_DATA = `INSERT INTO "UserGroups" ("id","userId","groupId") VALUES 
    ('39b3f092-d285-4715-bd6e-4c16dcf2ca99', '39b3f092-d285-4715-bd6e-4c16dcf2caa6', '39b3f092-d285-4715-bd6e-4c16dcf2caa3'),
    ('39b3f092-d285-4715-bd6e-4c16dcf2ca98', '39b3f092-d285-4715-bd6e-4c16dcf2caa8', '39b3f092-d285-4715-bd6e-4c16dcf2caa9')
;`;