import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../Types/UserRole";
import { IAuthenticatedRequest, IJwtPayload } from "../Types/AuthenticatedRequest";

class AuthMiddleware {
    static authenticateToken(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header is missing" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }

        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    }

    static authorizeAdmin(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
        if (req.user?.role === UserRole.Admin) {
            next();
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    }
}

export default AuthMiddleware;
