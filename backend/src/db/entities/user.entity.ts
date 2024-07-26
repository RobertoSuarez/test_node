import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./userstatus.entity";
import { Rol } from "./rol.entity";
import { Cash } from "./cash.entity";
import { BaseTable } from "../common/basetable.entity";


@Entity()
export class User extends BaseTable {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 100, unique: true})
    email: string;

    @Column({ length: 100})
    password: string;

    @ManyToOne(() => Rol, (rol) => rol.users)
    rol: Rol;

    // Relación para saber quien fue el creador de este usuario.
    @ManyToOne(() => User, (user) => user.createdUsers, { nullable: true })
    createdBy: User;

    @OneToMany(() => User, (user) => user.createdBy)
    createdUsers: User[];

    @Column()
    userApproval: boolean;

    @Column({ type: 'timestamptz', default: null })
    dateApproval: string;

    @ManyToOne(() => UserStatus, (userStatus) => userStatus.users)
    userStatus: UserStatus;

    @ManyToMany(() => Cash)
    @JoinTable()
    cash: Cash[];
}