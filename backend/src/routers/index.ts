import express from 'express';

import usersRouter from './user.router';
import clientRouter from './clients.router';
import turnRouter from './turn.router';

const routingAPI = (app: express.Application) => {
    const routerV1 = express.Router();
    app.use('/api/v1', routerV1);
    routerV1.use('/users', usersRouter);
    routerV1.use('/clients', clientRouter);
    routerV1.use('/turn', turnRouter);
}

export { routingAPI }