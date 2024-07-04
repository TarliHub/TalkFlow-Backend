import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRole } from "../Types/UserRole";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.User })
    role!: UserRole;

    constructor(username: string, role: UserRole, email: string, password: string) {
        this.username = username;
        this.role = role;
        this.email = email;
        this.password = password;
    }
}
