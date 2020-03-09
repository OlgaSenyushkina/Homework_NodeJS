import * as validation from 'express-joi-validation';

export const validator = validation.createValidator({ passError: true });

export const PORT = 3000;

export const REG_EXP_PERMISSION = /^(READ|WRITE|DELETE|SHARE|UPLOAD_FILES)$/;
export const REG_EXP_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)(.*[a-zA-Z0-9]{3,15})$/;
export const MAX_PASSWORD = 15;
export const MIN_PASSWORD = 3;
export const MAX_AGE = 130;
export const MIN_AGE = 4;
export const LIMIT_USERS = 5;

export const BUSINESS_EXCEPTION_CODES = {
    NOT_FOUND: 'NOT_FOUND',
    BAD_DATA: 'BAD_DATA',
    NOT_AUTHORIZED: 'NOT_AUTHORIZED',
};

export const CODES = {
    ...BUSINESS_EXCEPTION_CODES,
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    SUCCESS: 'SUCCESS',
};
  
export const statusCodes = {
    [CODES.SUCCESS]: 200,
    [CODES.BAD_DATA]: 400,
    [CODES.NOT_AUTHORIZED]: 401,
    [CODES.NOT_FOUND]: 404,
    [CODES.INTERNAL_SERVER_ERROR]: 500,
};
  
export const DEFAULT_MESSAGE = 'Something went wrong';
export const DEFAULT_ERROR_STATUS = statusCodes[CODES.INTERNAL_SERVER_ERROR];
export const DEFAULT_SUCCESS_STATUS = statusCodes[CODES.SUCCESS];
export const DEFAULT_SUCCESS_RESULT = { success: true, code: CODES.SUCCESS };