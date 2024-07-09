import { DataSource } from "typeorm";
import { User } from "./Model/User";
import { UserChat } from "./Model/UserChat";
import { Message } from "./Model/Message";
import { Chat } from "./Model/Chat";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST || "localhost",
    port: 5432,
    username: process.env.TYPEORM_USERNAME || "postgres",
    password: process.env.TYPEORM_PASSWORD || "123456",
    database: process.env.TYPEORM_DATABASE || "postgres",
    synchronize: true,
    logging: process.env.TYPEORM_LOGGING === "true",
    entities: [User, Chat, UserChat, Message],
    migrations: ["src/migration/**/*.ts"],
});
