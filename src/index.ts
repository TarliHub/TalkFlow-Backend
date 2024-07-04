import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { setupSwagger } from "./swagger";

import { AppDataSource } from "./data-source";

import userRoutes from "./Routes/UserRoute";
import authRoutes from "./Routes/AuthRoute";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());

        app.use("/api", userRoutes);
        app.use("/api", authRoutes);

        setupSwagger(app);
        console.log("Swagger api-docs: http://localhost:3000/api-docs");

        app.listen(3000);

        console.log(
            "Express server has started on port 3000. Open http://localhost:3000"
        );
    })
    .catch((error) => console.log(error));
