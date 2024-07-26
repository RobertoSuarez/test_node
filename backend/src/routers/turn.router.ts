import express, { NextFunction, Request, Response } from 'express';
import { TurnService } from '../services/turn.service';
import { validatorHandler } from '../middlewares/validato.handler';
import { createTurnScheme } from '../scheme/turn.scheme';


const router = express.Router();
const turnService = new TurnService();

router.get('/', async (req: Request, res: Response) => {
    const turns = await turnService.findAll();
    res.json(turns);
})

router.post('/', 
    validatorHandler(createTurnScheme, 'body' ),
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const turnCreated = await turnService.createTurn(req.body);
        res.json({
            id: turnCreated.turnId,
        });
    } catch(err) {
        next(err);
    }
})

export default router;