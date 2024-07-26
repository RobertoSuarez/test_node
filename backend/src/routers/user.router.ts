import express, { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/users.service';
import { validatorHandler } from '../middlewares/validato.handler';
import { createUserScheme, updateUserScheme, userIdScheme } from '../scheme/user.scheme';


const router = express.Router();
const userService = new UserService();

// Get all users
router.get('/', async (req: Request, res: Response) => {
    const users = await userService.findAll();
    res.json(users);
})

router.post('/',
    validatorHandler(createUserScheme, 'body'),
    async (req: Request, res: Response, next: NextFunction) => {
        const { creatorUserId, newUser } = req.body;
        try {
            const userCreated = await userService.createUser(creatorUserId, newUser);
            res.json({id: userCreated.id});
        } catch(err) {
            next(err);
        }
    }
)

router.put('/:userId',
    validatorHandler(userIdScheme, 'params'),
    validatorHandler(updateUserScheme, 'body'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;
            const id = await userService.updateUser(Number(userId), req.body);
            res.json({ id })
        } catch(err) {
            next(err);
        }
    }
)

router.delete('/:userId', 
    validatorHandler(userIdScheme, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        try {
            const userDeleted = await userService.deleteUser(Number(userId));
            res.json({
                id: userDeleted.id,
            })
        } catch(err) {
            next(err);
        }
    }

)

export default router;