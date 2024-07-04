import { Response } from "express";
import { NotFoundError, UnauthorizedError, ConflictError } from "../Errors/CustomErrors";

export class ErrorHandler {
    static handleError(error: any, res: Response) {
        console.error("Error: ", error);

        if (error instanceof UnauthorizedError) {
            res.status(401).json({ message: error.message });
        } else if (error instanceof ConflictError) {
            res.status(409).json({ message: error.message });
        } else if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}
