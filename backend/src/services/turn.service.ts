import { badRequest, serverUnavailable } from "@hapi/boom";
import { Cash } from "../db/entities/cash.entity";
import { Turn } from "../db/entities/turn.entity";
import { AppDataSource } from "../libs/typeormconfig";
import { User } from "../db/entities/user.entity";


export class TurnService {

    private turnRepository = AppDataSource.getRepository(Turn);
    private cashRepository = AppDataSource.getRepository(Cash);
    private userRepository = AppDataSource.getRepository(User);

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
            throw err;
        }
    }

    async getTotalTurns(userId: number) {
        try {
            const entityManager = AppDataSource.manager;
            const result = await entityManager.query(
                'SELECT get_total_turnos($1, $2)',
                [userId, new Date()]
            )
            console.log(result);
            return result[0].get_total_turnos;

        } catch(err) {
            throw err;
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

    async updateTurn(turnId, payloadTurn) {
        try {
            const turn = await this.turnRepository.findOne({
                where: { turnId: turnId }
            })

            if (!turn) {
                throw badRequest('Turn not found');
            }

            const cash = await this.cashRepository.findOne({
                where: {
                    cashId: payloadTurn.cashId
                }
            });

            if (!cash) {
                throw badRequest('Cash not found');
            }

            turn.description = payloadTurn.description;
            turn.date = payloadTurn.date;
            turn.userGestorId = payloadTurn.userGestorId;
            turn.cash = cash;
            await this.turnRepository.save(turn);
            return turn;
        } catch(err) {
            throw err;
        }
    }

    async deleteTurn(turnId: number) {
        try {
            const turn = await this.turnRepository.findOneBy({ turnId });
            if (!turn) {
                throw badRequest('Turn not found');
            }
            await this.turnRepository.softDelete({ turnId });
            return turn;
        } catch(err) {
            throw err;
        }
    }
}