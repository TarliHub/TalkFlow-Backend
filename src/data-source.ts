import { DataSource } from "typeorm";
import { User } from "./Model/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST || "localhost",
    port: 5432,
    username: process.env.TYPEORM_USERNAME || "postgres",
    password: process.env.TYPEORM_PASSWORD || "123456",
    database: process.env.TYPEORM_DATABASE || "postgres",
    synchronize: true,
    logging: process.env.TYPEORM_LOGGING === "true",
    entities: [User],
    migrations: ["src/migration/**/*.ts"],
});
