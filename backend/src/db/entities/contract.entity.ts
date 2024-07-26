import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./service.entity";
import { Client } from "./client.entity";
import { MethodPayment } from "./methodpayment.entity";
import { ContractStatus } from "./contractstatus.entity";


@Entity()
export class Contract {

    @PrimaryGeneratedColumn()
    contractId: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    startDate: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    endDate: Date;

    @ManyToOne(() => Service, (service) => service.contracts)
    service: Service;

    @ManyToOne(() => Client, (client) => client.contracts)
    client: Client;

    @ManyToOne(() => MethodPayment, (methodPayment) => methodPayment.contracts)
    methodPayment: MethodPayment;

    @ManyToOne(() => ContractStatus, (contractStatus) => contractStatus.contracts)
    contractStatus: ContractStatus;
}