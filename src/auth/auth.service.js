import jwt from "jsonwebtoken";
import { userModel } from '../user';
import { CustomError, statusCodes, CODES } from '../helpers';
import { JWT_SECRET_KEY } from '../helpers/secret';
import { TOKEN_LIFE_TIME_SECONDS } from '../helpers/const';

export const login = async (username, password) => {
    if (!username || !password) {
        throw new CustomError({ 
            code: statusCodes[CODES.BAD_DATA],
            message: 'Incorrect credentials!',
            service: 'auth',
            method: 'login',
        });
    }

    const foundedUser = await userModel.getUserByLogin(username);
    
    if (!foundedUser) {
        throw new CustomError({ 
            code: statusCodes[CODES.BAD_DATA],
            message: 'User not found!',
            service: 'auth',
            method: 'login',
        });
    }

    if (foundedUser.password !== password) {
        throw new CustomError({ 
            code: statusCodes[CODES.BAD_DATA],
            message: 'Incorrect password!',
            service: 'auth',
            method: 'login',
        });
    }

    return jwt.sign({ login: username }, JWT_SECRET_KEY);
};

export const checkJwtToken = (token) => {
    if (!token) {
        throw new CustomError({ 
            code: statusCodes[CODES.NOT_AUTHORIZED],
            message: 'Not authorized',
            service: 'auth',
            method: 'checkJwtToken',
        });
    }

    try {
        const jwtToken = token.split('Bearer ')[1];
        const payload = jwt.verify(jwtToken, JWT_SECRET_KEY);

        if ((Date.now() - (payload.iat * 1000)) > TOKEN_LIFE_TIME_SECONDS * 1000) {
            throw new Error("Token was expired");
        }
        
        return payload;
    } catch (e) {
        throw new CustomError({ 
            code: statusCodes[CODES.FORBIDDEN],
            message: 'Forbidden',
            service: 'auth',
            method: 'checkJwtToken',
        });
    }
};