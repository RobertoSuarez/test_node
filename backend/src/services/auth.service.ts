import jwt from 'jsonwebtoken';
import { notFound } from "@hapi/boom";
import { User } from "../db/entities/user.entity";
import { AppDataSource } from "../libs/typeormconfig";
import { config } from '../config/config';



export class AuthService {

    private userRepository = AppDataSource.getRepository(User);

    async login(username: string, password: string) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    username,
                    password
                },
                relations: ['rol']
            });
            if (!user) {
                throw notFound('Error al ingresar al sistema');
            }
            const jwtToken = await this.generateToken(user);
            return {
                token: jwtToken,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    rol: {
                        id: user.rol.id,
                        rolName: user.rol.rolName,
                    },        
                }
            };
        } catch(err) {
            throw err;
        }
    }

    async generateToken(user: User) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            rol: {
                id: user.rol.id,
                rolName: user.rol.rolName,
            },
        }
        return jwt.sign(payload, config.jwtSecret, { expiresIn: '30min' });
    }

}