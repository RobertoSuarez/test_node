import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./device.entity";
import { Contract } from "./contract.entity";


@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    serviceId: number;

    @Column({length: 100})
    serviceName: string;

    @Column({ length: 150 })
    serviceDescription: string;

    @Column({ type: 'float' })
    price: number;

    @OneToMany(() => Device, (device) => device.service)
    devices: Device[];

    @OneToMany(() => Contract, (contract) => contract.service)
    contracts: Contract[];
}