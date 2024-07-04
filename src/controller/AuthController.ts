import { AuthService } from "../Service/AuthService";
import { Request, Response } from "express";
import { ErrorHandler } from "../Utils/ErrorHandler";

export class AuthController {
    private authService = new AuthService();

    async login(req: Request, res: Response) {
        try {
            const data = await this.authService.login(req.body.email, req.body.password);
            res.status(200).json(data);
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }

    async register(req: Request, res: Response) {
        try {
            const data = await this.authService.register(req.body.username, req.body.email, req.body.password);
            res.status(201).json(data);
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }

    async registerAdmin(req: Request, res: Response) {
        try {
            const data = await this.authService.registerAdmin(req.body.username, req.body.email, req.body.password);
            res.status(201).json(data);
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }
}
