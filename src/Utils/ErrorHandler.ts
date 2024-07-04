import { Response } from "express";

export class ErrorHandler {
    static handleError(error: any, res: Response) {
        console.error("Error: ", error);

        if (
            error.message === "User not found" ||
            error.message === "Invalid password"
        ) {
            res.status(401).json({ message: "Invalid email or password" });
        } else if (error.message === "User already exists") {
            res.status(409).json({ message: "User already exists" });
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}
