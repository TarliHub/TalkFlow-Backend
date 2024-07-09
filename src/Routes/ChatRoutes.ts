import { Router } from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import { ChatController } from "../Controller/ChatController";

const chatController = new ChatController();
const router = Router();

router.get("/chats", AuthMiddleware.authenticateToken, chatController.getAllChats.bind(chatController));
router.delete("/chats/:chatId", AuthMiddleware.authenticateToken, chatController.deleteChat.bind(chatController));
router.delete("/chats/removeUser/:chatId", AuthMiddleware.authenticateToken, chatController.removeUserFromChat.bind(chatController));

export default router;
