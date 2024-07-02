import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import { Express } from "express";

const doc = {
    info: {
        title: "Express API",
        description:
            "This is a REST API application made with Express, TypeORM and documented with Swagger",
    },
    host: "localhost:3000",
    schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/Routes/UserRoute.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);

export function setupSwagger(app: Express) {
    const swaggerFile = require("./swagger-output.json");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
}
