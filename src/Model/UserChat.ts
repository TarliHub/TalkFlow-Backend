import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Chat } from "./Chat";

@Entity()
export class UserChat {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.userChats)
    user!: User;

    @ManyToOne(() => Chat, chat => chat.userChats)
    chat!: Chat;
}
