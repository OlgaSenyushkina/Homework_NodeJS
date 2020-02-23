import { createLogger, transports, format } from 'winston';
import { BUSINESS_EXCEPTION_CODES } from './helpers/const';

const errorLogger = (filename) => createLogger({
  level: 'error',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple(),
      ) }),
    new transports.File({ filename }),
  ]
});

export const log = (error) => {
    const { message, code, stack, method, service } = error;
    const logData = code ? { message, method, service } : { message, stack };
    const isBusinessExceptionCodes = code && BUSINESS_EXCEPTION_CODES[code];
    const filename = isBusinessExceptionCodes ? './logs/businessExceptions.log' : './logs/systemErrors.log';
    const logger = errorLogger(filename);
    
    logger.error(logData);
};