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

export const DEFAULT_MESSAGE = 'Something went wrong';

export const CODES = {
    NOT_FOUND: 'NOT_FOUND',
    BAD_DATA: 'BAD_DATA',
    SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',
    SUCCESS: 'SUCCESS',
};
  
export const statusCodes = {
    [CODES.SUCCESS]: 200,
    [CODES.BAD_DATA]: 400,
    [CODES.NOT_FOUND]: 404,
    [CODES.SOMETHING_WENT_WRONG]: 500,
};
  
export const DEFAULT_ERROR_STATUS = statusCodes[CODES.SOMETHING_WENT_WRONG];
export const DEFAULT_SUCCESS_STATUS = statusCodes[CODES.SUCCESS];
export const DEFAULT_SUCCESS_RESULT = { success: true, code: CODES.SUCCESS };