import { Response } from "express";
import { UserService } from "../Service/UserService";
import { IAuthenticatedRequest } from "../Types/AuthenticatedRequest";
import { ErrorHandler } from "../Utils/ErrorHandler";

export class UserController {
    private userService = new UserService();

    async getAllUsers(req: IAuthenticatedRequest, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const { users, total } = await this.userService.getAllUsers(page, limit);

            res.status(200).json({
                users,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            });
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }

    async getUserById(req: IAuthenticatedRequest, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }

    async deleteUser(req: IAuthenticatedRequest, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }
}
