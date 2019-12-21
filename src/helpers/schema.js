import * as Joi from '@hapi/joi';
import { 
    REG_EXP_PASSWORD,
    MIN_PASSWORD,
    MAX_PASSWORD,
    MAX_AGE,
    MIN_AGE,
 } from './const';

export const querySchema = Joi.object({
    login: Joi
        .string()
        .required(),
    password: Joi
        .string()
        .pattern(REG_EXP_PASSWORD)
        .min(MIN_PASSWORD)
        .max(MAX_PASSWORD)
        .required(),
    age: Joi
        .number()
        .integer()
        .min(MIN_AGE)
        .max(MAX_AGE)
        .required(),
});