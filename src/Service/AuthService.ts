import { User } from "../Model/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRole } from "../Types/UserRole";

dotenv.config();

const JWT_SECRET = `${process.env.JWT_SECRET}`;

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    private generateToken(user: User): string {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    }

    async login(
        email: string,
        password: string
    ): Promise<{ role: UserRole; token: string }> {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                throw new Error("User not found");
            }
            if (!(await bcrypt.compare(password, user.password))) {
                throw new Error("Invalid password");
            }
            const token = this.generateToken(user);
            return { role: user.role, token };
        } catch (error) {
            console.error("Error during login: ", error);
            throw error;
        }
    }

    async register(
        username: string,
        email: string,
        password: string
    ): Promise<{ role: UserRole; token: string }> {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email },
            });
            if (existingUser) {
                throw new Error("User already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User(username, UserRole.User, email, hashedPassword);
            const savedUser = await this.userRepository.save(user);
            const token = this.generateToken(savedUser);
            return { role: savedUser.role, token };
        } catch (error) {
            console.error("Error during registration: ", error);
            throw error;
        }
    }

    async registerAdmin(
        username: string,
        email: string,
        password: string
    ): Promise<{ role: UserRole; token: string }> {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email },
            });
            if (existingUser) {
                throw new Error("User already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User(username, UserRole.Admin, email, hashedPassword);
            const savedUser = await this.userRepository.save(user);
            const token = this.generateToken(savedUser);
            return { role: savedUser.role, token };
        } catch (error) {
            console.error("Error during admin registration: ", error);
            throw error;
        }
    }
}
