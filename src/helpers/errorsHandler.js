import { DEFAULT_ERROR_STATUS, DEFAULT_MESSAGE, statusCodes, CODES } from './const';
import { log } from '../logger';

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

export const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
}

export const errorsHandler = (err, req, res, next) => {
  const error = {
      success: false,
      message: err.message || DEFAULT_MESSAGE,
      code: err.code || DEFAULT_ERROR_STATUS
    };

  log(error);
  
  res.status(err.code || DEFAULT_ERROR_STATUS).json(error);
  return;
}

export const validationErrorHandler = (err, req, res, next) => {
  if (err.error && err.error.isJoi) {
      const message = err.error.details.reduce((acc, current) => {
          acc[current.path[0]] = current.message;
          
          return acc;
      }, {});
      
      log({ 
        success: false,
        message: JSON.stringify(message),
        code: CODES.BAD_DATA,
      });

      res.status(statusCodes[CODES.BAD_DATA]).json(message);
      return;
  } else {
      next(err);
  }
};