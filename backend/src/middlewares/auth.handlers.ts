import { unauthorized } from "@hapi/boom";
import jwt from 'jsonwebtoken';
import { config } from "../config/config";
import { NextFunction, Request, Response } from "express";


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        throw unauthorized('No token provided');
    }

    console.log(token);

    try {
        const decoded = jwt.verify(token.split(' ')[1], config.jwtSecret);
        req['user'] = decoded;
        next();
    } catch(err) {
        throw unauthorized(err.message);
    }
}

export { authMiddleware };