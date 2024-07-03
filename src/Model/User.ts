import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    constructor(
        username: string,
        role: "User" | "Admin",
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
    role: "User" | "Admin";

    @Column()
    email: string;

    @Column()
    password: string;
}
