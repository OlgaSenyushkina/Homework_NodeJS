import * as Joi from '@hapi/joi';
import { REG_EXP_PERMISSION } from '../helpers';

export const groupSchema = Joi.object({
    name: Joi
        .string()
        .required(),
    permissions: Joi
        .array()
        .items(
            Joi
            .string()
            .pattern(REG_EXP_PERMISSION)
        )
        .required(),
});