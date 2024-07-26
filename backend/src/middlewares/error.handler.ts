import { Boom, isBoom } from '@hapi/boom';
import { Request, Response, NextFunction } from 'express'


const logErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('logErrors');
    console.log(error)
    next(error);
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('errorHandler');
    console.log(err)
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

const boomErrorHandler = (err: Error | Boom, req: Request, res: Response, next: NextFunction) => {
    if (isBoom(err)) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
        return;
    } 
    next(err);
}

export { logErrors, errorHandler, boomErrorHandler };