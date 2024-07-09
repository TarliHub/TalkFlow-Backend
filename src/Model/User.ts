import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserChat } from "./UserChat";
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

    @OneToMany(() => UserChat, userChat => userChat.user)
    userChats!: UserChat[];

    constructor(username: string, role: UserRole, email: string, password: string) {
        this.username = username;
        this.role = role;
        this.email = email;
        this.password = password;
    }
}
