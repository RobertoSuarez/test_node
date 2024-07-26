import { badRequest, serverUnavailable } from "@hapi/boom";
import { Cash } from "../db/entities/cash.entity";
import { Turn } from "../db/entities/turn.entity";
import { AppDataSource } from "../libs/typeormconfig";


export class TurnService {

    private turnRepository = AppDataSource.getRepository(Turn);
    private cashRepository = AppDataSource.getRepository(Cash);

    async findAll() {
        try {
            const turns = await this.turnRepository.find({ relations: ['cash'] });

            return turns.map(turn => {
                return {
                    id: turn.turnId,
                    description: turn.description,
                    date: turn.date,
                    cash: turn.cash ? {
                        id: turn.cash.cashId,
                        cashDescription: turn.cash.cashDescription
                    } : null,
                    userGestorId: turn.userGestorId
                }
            })
        } catch(err) {

        }
    }

    async createTurn(newTurn) {
        try {
            const cash = await this.cashRepository.findOne({
                where: {
                    cashId: newTurn.cashId,
                }
            });
    
            if (!cash) {
                throw badRequest('Cash not found');
            }
    
            const turnCreated = this.turnRepository.create({
                description: newTurn.description,
                date: newTurn.date,
                userGestorId: newTurn.userGestorId,
                cash: cash
            });
    
            return await this.turnRepository.save(turnCreated);
        } catch(err) {
            throw serverUnavailable(err.message);
        }
    }
}