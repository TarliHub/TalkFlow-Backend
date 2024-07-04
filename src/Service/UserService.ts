import { User } from "../Model/User";
import { AppDataSource } from "../data-source";
import { NotFoundError } from "../Errors/CustomErrors";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async getAllUsers(page: number, limit: number): Promise<{ users: User[], total: number }> {
        const adjustedLimit = limit > 50 ? 50 : limit;
        const [users, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * adjustedLimit,
            take: adjustedLimit,
        });
        return { users, total };
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }

    async deleteUser(id: number): Promise<void> {
        const userToRemove = await this.userRepository.findOne({ where: { id } });
        if (!userToRemove) {
            throw new NotFoundError("User not found");
        }
        await this.userRepository.remove(userToRemove);
    }
}
