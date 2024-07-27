import express, { NextFunction, Request, Response } from 'express';
import { TurnService } from '../services/turn.service';
import { validatorHandler } from '../middlewares/validato.handler';
import { createTurnScheme, turnIdScheme, updateTurnScheme } from '../scheme/turn.scheme';
import { authMiddleware } from '../middlewares/auth.handlers';


const router = express.Router();
const turnService = new TurnService();

router.get('/', async (req: Request, res: Response) => {
    const turns = await turnService.findAll();
    res.json(turns);
})

router.get('/total-turns', 
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req['user'];
            const result = await turnService.getTotalTurns(user.id);
            res.json({
                total: result
            });
        } catch(err) {
            throw err;
        }
    }
)

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

router.put('/:turnId',
    validatorHandler(turnIdScheme, 'params'),
    validatorHandler(updateTurnScheme, 'body'),
    async (req: Request, res: Response, next: NextFunction) => {
        const { turnId } = req.params;
        try {
            const turnUpdated = await turnService.updateTurn(Number(turnId), req.body);
            res.json({
                id: turnUpdated.turnId,
            })
        } catch(err) {
            next(err);
        }
    }
)

router.delete('/:turnId',
    validatorHandler(turnIdScheme, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
        const { turnId } = req.params;
        try {
            const turnDeleted = await turnService.deleteTurn(Number(turnId));
            res.json({
                id: turnDeleted.turnId,
            })
        } catch(err) {
            next(err);
        }
    }
)

export default router;