import { Collection, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cash } from "./cash.entity";
import { Attention } from "./attention.entity";
import { BaseTable } from "../common/basetable.entity";


@Entity()
export class Turn extends BaseTable {

    @PrimaryGeneratedColumn()
    turnId: number;

    @Column({ length: 7})
    description: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToOne(() => Cash, (cash) => cash.turns)
    cash: Cash;

    @Column()
    userGestorId: number;

    @OneToMany(() => Attention, (attention) => attention.turn)
    attentions: Attention[];
}