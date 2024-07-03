import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    constructor(
        username: string,
        role: 0 | 1,
        email: string,
        password: string
    ) {
        this.username = username;
        this.role = role;
        this.email = email;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username: string;

    @Column()
    role: 0 | 1;

    @Column()
    email: string;

    @Column()
    password: string;
}
