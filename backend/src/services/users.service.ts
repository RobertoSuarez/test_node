import { badRequest, notFound, serverUnavailable } from "@hapi/boom";
import { QueryFailedError } from 'typeorm';
import { AppDataSource } from "../libs/typeormconfig";
import { User } from "../db/entities/user.entity";
import { Rol } from "../db/entities/rol.entity";



export const ADMIN = 'ADMIN';
export const CAJERO = 'CAJERO';
export const GESTOR = 'GESTOR';

export class UserService {

    private userRepository = AppDataSource.getRepository(User);
    private rolRepository = AppDataSource.getRepository(Rol);

    

    async createUser(creatorUserId, newUser) {
        try {
            const creatorUser = await this.userRepository.findOne({ 
                where: {
                    id: creatorUserId
                },
                relations: ['rol']
            })

            if (!creatorUser) {
                throw badRequest('User creator not found');
            }

            const rol = await this.rolRepository.findOne({
                where: {
                    id: newUser.rolId
                }
            })
            
            // El usuario administrador puede crear usuarios cajeros y usuarios gestores
            switch(creatorUser.rol.rolName) {
                case ADMIN:
                    if (rol.rolName !== CAJERO && rol.rolName !== GESTOR) {
                        throw badRequest('Only admins can create cajeros and gestores');
                    }
                    break;
                case GESTOR:
                    if (rol.rolName !== CAJERO && rol.rolName !== GESTOR) {
                        throw badRequest('Only gestors can create cashiers and other gestors');
                    }
                    break;
                default: 
                    throw badRequest('Only admins and gestors can create users');
            }

            const userCreated = this.userRepository.create({
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                rol: rol,
                createdBy: creatorUser,
                userApproval: false,
                dateApproval: null,
                userStatus: { statusId: 'PEN' },
            });
            await this.userRepository.save(userCreated);

            return userCreated;
        } catch(err) {
            if (err instanceof QueryFailedError) {
                if (err.driverError.code === '23505') {
                    throw badRequest('A user with this username or email already exists');
                } else {
                    throw serverUnavailable(err.message);   
                }
            } else {
                throw serverUnavailable(err.message);
            }
        }
    }

    async findAll() {
        try {
            const users = await this.userRepository.find({
                relations: ['rol', 'createdBy', 'userStatus']
            });
            return users.map(user => {
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    rol: user.rol.rolName,
                    createdBy: user.createdBy 
                    ? { 
                        id: user.createdBy.id, 
                        username: user.createdBy.username 
                    } 
                    : null,
                    status: {
                        id: user.userStatus.statusId,
                        description: user.userStatus.description,
                    }
                }
            });
        } catch (err) {
            throw serverUnavailable('Database connection error');
        }
    }

    async create(user) {
        try {
            const newUser = this.userRepository.create({
                ...user
            });
            await this.userRepository.save(newUser);
            return newUser;
        } catch(err) {
            throw serverUnavailable(err.message);
        }
    }

    async updateUser(userId: number, userUpdate) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId }})
            if (!user) {
                throw notFound('User not found');
            }
            const rol = await this.rolRepository.findOne({ where: { id: userUpdate.rolId }})
            if (!rol) {
                throw notFound('Rol not found');
            }
            await this.userRepository.update({ id: userId }, {
                username: userUpdate.username,
                email: userUpdate.email,
                rol: rol
            });
            return user.id;

        } catch(err) {
            throw err;
        }
    }

    async deleteUser(id: number) {
        try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw notFound('User not found');
            }
            await this.userRepository.softDelete({ id: user.id });
            return user;

        } catch(err) {
            throw err;
        }
    }



}