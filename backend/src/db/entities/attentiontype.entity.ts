import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Attention } from "./attention.entity";


@Entity()
export class AttentionType {

    @PrimaryColumn({ length: 3 })
    attentionTypeId: string;

    @Column({ length: 100 })
    description: string;

    @OneToMany(() => Attention, (attention) => attention.attentionType)
    attentions: Attention[];
}