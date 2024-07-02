import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";
import userRoutes from "./Routes/UserRoute";
import { setupSwagger } from "./swagger";
dotenv.config();

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());

        app.use("/api/users", userRoutes);

        setupSwagger(app);
        console.log("Swagger api-docs: http://localhost:3000/api-docs");

        app.listen(3000);

        console.log(
            "Express server has started on port 3000. Open http://localhost:3000"
        );
    })
    .catch((error) => console.log(error));
