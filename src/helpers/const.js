import * as validation from 'express-joi-validation';

export const validator = validation.createValidator({});

export const PORT = 3000;

export const REG_EXP_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)(.*[a-zA-Z0-9]{3,15})$/;
export const MAX_PASSWORD = 15;
export const MIN_PASSWORD = 3;
export const MAX_AGE = 130;
export const MIN_AGE = 4;
export const LIMIT_USERS = 5;