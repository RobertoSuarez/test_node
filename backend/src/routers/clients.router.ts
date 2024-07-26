import express, { NextFunction, Request, Response } from 'express';
import { ClientService } from "../services/clients.service";
import { validatorHandler } from '../middlewares/validato.handler';
import { clientIdScheme, createClientScheme, updateClienteScheme } from '../scheme/client.scheme';


const router = express.Router();
const clientService = new ClientService();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clients = await clientService.findAll();
        res.json(clients);
    } catch (err) {
        next(err);
    }
})

// Create client
router.post('/', 
    validatorHandler(createClientScheme, 'body'),
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientCreated = await clientService.createClient(req.body);
        res.status(201).json({id: clientCreated.clientId});
    } catch (err) {
        next(err);
    }
})

router.put('/:clientId',
    validatorHandler(clientIdScheme, 'params'),
    validatorHandler(updateClienteScheme, 'body'),
    async (req: Request, res: Response, next: NextFunction) => {
        const { clientId } = req.params;
        try {
            const clientUpdated = await clientService.updateClient(Number(clientId), req.body);
            res.json({
                id: clientUpdated.clientId,
            })
        } catch(err) {
            next(err);
        }
    }
)

router.delete('/:clientId', 
    validatorHandler(clientIdScheme, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
        const { clientId } = req.params;
        try {
            const clientDeleted = await clientService.deleteClient(Number(clientId));
            res.json({
                id: clientDeleted.clientId,
            })
        } catch(err) {
            next(err);
        }
    }

)


export default router;