import { statusCodes, DEFAULT_ERROR_STATUS, DEFAULT_MESSAGE } from './const';
import { log } from '../logger';

export const errorsHandler = (error, req, res) => {
  log(error);
  res
    .status(statusCodes[error.code || DEFAULT_ERROR_STATUS])
    .json({
        success: false,
        message: error.message || DEFAULT_MESSAGE,
        code: error.code || DEFAULT_ERROR_STATUS
    });
};

export class CustomError {
  constructor({ code = DEFAULT_ERROR_STATUS, message = DEFAULT_MESSAGE, service, method }) {
    this.succes = false;
    this.message = message;
    this.code = code;

    if (method) {
      this.method = method;
    }
    
    if (service) {
      this.service = service;
    }
  }
}