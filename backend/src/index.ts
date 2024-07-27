import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { boomErrorHandler, errorHandler, logErrors } from './middlewares/error.handler';
import { routingAPI } from './routers';


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: "*",
}));

routingAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Escuchando en el puerto', port)
})