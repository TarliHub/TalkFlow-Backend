import { AuthService } from "../Service/AuthService";
import { Request, Response } from "express";
import { ErrorHandler } from "../Utils/ErrorHandler";

export class AuthController {
    private authService = new AuthService();

    async login(req: Request, res: Response) {
        try {
            const data = await this.authService.login(
                req.body.email,
                req.body.password
            );
            res.status(200).json(data);
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const data = await this.authService.register(
                username,
                email,
                password
            );
            res.status(201).json(data);
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }
}
