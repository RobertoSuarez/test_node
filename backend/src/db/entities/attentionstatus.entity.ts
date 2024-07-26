import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Attention } from "./attention.entity";


@Entity()
export class AttentionStatus {

    @PrimaryGeneratedColumn()
    statusId: string;

    @Column({ length: 30 })
    description: string;

    @OneToMany(() => Attention, (attention) => attention.attentionStatus)
    attentions: Attention[];
}