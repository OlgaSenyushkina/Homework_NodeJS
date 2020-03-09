import { statusCodes, DEFAULT_SUCCESS_STATUS } from './const';

export const sendResponse = (res, result) => {
    if (result) {
        res.status(statusCodes[result.code] || DEFAULT_SUCCESS_STATUS).json(result);
        return;
    } else {
        throw new Error();
    }
}