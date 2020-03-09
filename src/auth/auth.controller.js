import { login, checkJwtToken } from './auth.service'; 
import { CustomError, statusCodes, CODES, sendResponse } from '../helpers';

export const checkCredentials = async (req, res, next) => {
    const { login: username, password } = req.body;
    try {
        const result = await login(username, password);
        
        if (result) {
            sendResponse(res, result);
        } else {
            throw new CustomError({ 
                code: statusCodes[CODES.INTERNAL_SERVER_ERROR],
                message: 'Internal server error',
                service: 'auth',
                method: 'checkCredentials',
            });
        }
    } catch(error) {
        next(error);
    }
}

export const checkIfUserAuthorized = (req, res, next) => {
    try {
        checkJwtToken(req.headers.authorization);
        next();
    } catch (e) {
        next(e);
    }
};