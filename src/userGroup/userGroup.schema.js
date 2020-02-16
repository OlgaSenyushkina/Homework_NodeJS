import * as Joi from '@hapi/joi';

export const userGroupSchema = Joi.object({
    groupId: Joi
        .string(),
    users: Joi
        .array()
        .items(
            Joi
            .string()
        ),
});