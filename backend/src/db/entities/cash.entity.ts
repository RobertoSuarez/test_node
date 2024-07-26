import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Turn } from "./turn.entity";


@Entity()
export class Cash {

    @PrimaryGeneratedColumn()
    cashId: number;

    @Column({ length: 50 })
    cashDescription: string;

    @Column()
    active: boolean;

    @OneToMany(() => Turn, (turn) => turn.cash)
    turns: Turn[];

    
}