import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attention } from "./attention.entity";
import { Payments } from "./payments.entity";
import { Contract } from "./contract.entity";
import { BaseTable } from "../common/basetable.entity";


@Entity()
export class Client extends BaseTable {

    @PrimaryGeneratedColumn()
    clientId: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ length: 13, unique: true })
    identification: string;

    @Column({ length: 120, unique: true })
    email: string;

    @Column({ length: 13 })
    phoneNumber: string;

    @Column({ length: 100 })
    address: string;

    @Column({ length: 100 })
    referenceAddress: string;


    @OneToMany(() => Attention, (attention) => attention.client)
    attentions: Attention[];


    @OneToMany(() => Payments, (payments) => payments.client)
    payments: Payments[];

    @OneToMany(() => Contract, (contract) => contract.client)
    contracts: Contract[];
}