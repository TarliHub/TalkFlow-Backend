import { User } from "../Model/User";
import { AppDataSource } from "../data-source";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const userToRemove = await this.userRepository.findOne({
            where: { id },
        });
        if (userToRemove) {
            await this.userRepository.remove(userToRemove);
        } else {
            throw new Error("User not found");
        }
    }
}
