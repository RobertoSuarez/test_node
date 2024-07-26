import { badRequest } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

const validatorHandler = (schema: Schema, property: 'params' | 'body' | 'query') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], { abortEarly: true });
        if (error) {
            next(badRequest(error));
        } else {
            next();
        }
    }
}

export { validatorHandler };