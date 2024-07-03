import { User } from "../Model/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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
    ): Promise<{ role: string; token: string } | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = this.generateToken(user);
            return { role: user.role, token };
        }
        return null;
    }

    async register(
        username: string,
        email: string,
        password: string
    ): Promise<{ role: string; token: string }> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, "User", email, hashedPassword);
        const savedUser = await this.userRepository.save(user);
        const token = this.generateToken(savedUser);
        return { role: savedUser.role, token };
    }
}
