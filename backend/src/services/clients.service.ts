import { badRequest, notFound, serverUnavailable } from '@hapi/boom'
import { Client } from "../db/entities/client.entity";
import { AppDataSource } from "../libs/typeormconfig";
import { QueryFailedError } from 'typeorm';
import { User } from '../db/entities/user.entity';


export class ClientService {

    private clientRepository = AppDataSource.getRepository(Client);

    async findAll() {
        const clients = await this.clientRepository.find();

        return clients.map((client) => {
            return {
                id: client.clientId,
                name: client.name,
                lastName: client.lastName,
                identification: client.identification,
                email: client.email,
                phoneNumber: client.phoneNumber,
                address: client.address,
                referenceAddress: client.referenceAddress,
                createdAt: client.createdAt,
            }
        })
    }


    async createClient(newClient): Promise<Client> {
        try {
            const clientCreated = this.clientRepository.create({
             name: newClient.name,
             lastName: newClient.lastName,
             identification: newClient.identification,
             email: newClient.email,
             phoneNumber: newClient.phoneNumber,
             address: newClient.address,
             referenceAddress: newClient.referenceAddress,
            })

            await this.clientRepository.save(clientCreated);
            return clientCreated;

        } catch (err) {
            if (err instanceof QueryFailedError) {
                if (err.driverError.code === '23505') {
                    throw badRequest('A user with this identification or email already exists');
                } else {
                    throw serverUnavailable(err.message);   
                }
            } else {
                throw serverUnavailable(err.message);
            }
        }
    }

    async updateClient(clientId: number, clientUpdate) {
        try {
            const client = await this.clientRepository.findOneBy({ clientId: clientId });
            if (!client) {
                throw notFound('Client not found');
            }
            
            client.name = clientUpdate.name;
            client.lastName = clientUpdate.lastName;
            client.identification = clientUpdate.identification;
            client.email = clientUpdate.email;
            client.phoneNumber = clientUpdate.phoneNumber;
            client.address = clientUpdate.address;
            client.referenceAddress = clientUpdate.referenceAddress;
            await this.clientRepository.update({ clientId: clientId }, client);
            return client;
        } catch (err) {
            throw err;
        }
    }

    async deleteClient(clientId: number) {
        try {
            const client = await this.clientRepository.findOneBy({ clientId });
            if (!client) {
                throw notFound('Client not found');
            }
            await this.clientRepository.softDelete({ clientId: client.clientId });
            return client;
        } catch (err) {
            throw err;
        }
    }
}