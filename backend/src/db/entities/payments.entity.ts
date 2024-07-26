import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";


@Entity()
export class Payments {

    @PrimaryGeneratedColumn()
    paymentId: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    paymentDate: Date;

    @ManyToOne(() => Client, (client) => client.payments)
    client: Client;
}