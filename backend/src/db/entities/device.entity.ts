import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./service.entity";


@Entity()
export class Device {

    @PrimaryGeneratedColumn()
    deviceId: number;

    @Column({ length: 50 })
    deviceName: string;

    @ManyToOne(() => Service, (service) => service.devices)
    service: Service;
}