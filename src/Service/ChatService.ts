import { AppDataSource } from "../data-source";
import { Chat } from "../Model/Chat";
import { NotFoundError, UnauthorizedError } from "../Errors/CustomErrors";
import { UserChat } from "../Model/UserChat";

export class ChatService {
    private chatRepository = AppDataSource.getRepository(Chat);
    private userChatRepository = AppDataSource.getRepository(UserChat);

    async getAllChats(page: number, limit: number, userId?: number): Promise<{ chats: Chat[], total: number }> {
        if (!userId) throw new NotFoundError("User id not found");

        const adjustedLimit = limit > 50 ? 50 : limit;
        const [userChats, total] = await this.userChatRepository.findAndCount({
            where: { user: { id: userId } },
            skip: (page - 1) * adjustedLimit,
            take: adjustedLimit,
            relations: ["chat"]
        });

        const chats = userChats.map(userChat => userChat.chat);

        return { chats, total };
    }

    async removeUserFromChat(chatId: number, userId?: number): Promise<void> {
        if (!userId) throw new NotFoundError("User id not found");

        const userChatToRemove = await this.userChatRepository.findOne({ where: { chat: { id: chatId }, user: { id: userId } } });
        if (!userChatToRemove) throw new NotFoundError("User is not in this chat");

        await this.userChatRepository.remove(userChatToRemove);
    }

    async deleteChat(chatId: number, userId?: number): Promise<void> {
        if (!userId) throw new NotFoundError("User id not found");

        const chatToRemove = await this.chatRepository.findOne({ where: { id: chatId }, relations: ["userChats"] });
        if (!chatToRemove) throw new NotFoundError("Chat not found");

        const isUserInChat = chatToRemove.userChats.some(userChat => userChat.user.id === userId);
        if (!isUserInChat) throw new UnauthorizedError("User is not authorized to delete this chat");

        await this.userChatRepository.remove(chatToRemove.userChats);

        await this.chatRepository.remove(chatToRemove);
    }
}
