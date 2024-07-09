import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;

    @ManyToOne(() => Chat)
    chat!: Chat;

    @ManyToOne(() => User)
    sender!: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
}
