import { ChatService } from "../Service/ChatService";
import { Response } from "express";
import { IAuthenticatedRequest } from "../Types/AuthenticatedRequest";
import { ErrorHandler } from "../Utils/ErrorHandler";

export class ChatController {
    private chatService = new ChatService();

    async getAllChats(req: IAuthenticatedRequest, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const { chats, total } = await this.chatService.getAllChats(page, limit, req.user?.id);

            res.status(200).json({
                chats,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            });
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }

    async removeUserFromChat(req: IAuthenticatedRequest, res: Response) {
        try {
            const chatId = parseInt(req.params.chatId);

            await this.chatService.removeUserFromChat(chatId, req.user?.id);

            res.status(204).send();
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }

    async deleteChat(req: IAuthenticatedRequest, res: Response) {
        try {
            const chatId = parseInt(req.params.chatId);

            await this.chatService.deleteChat(chatId, req.user?.id);

            res.status(204).send();
        } catch (error) {
            ErrorHandler.handleError(error, res);
        }
    }
}
