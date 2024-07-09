import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { ChatType } from "../Types/ChatType";
import { UserChat } from "./UserChat";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: ChatType;

    @Column()
    chatName!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @OneToMany(() => UserChat, userChat => userChat.chat)
    userChats!: UserChat[];
}
