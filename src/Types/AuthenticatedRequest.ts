import { Request } from "express";
import { UserRole } from "./UserRole";

export interface IJwtPayload {
    userId: number;
    role: UserRole;
}

export interface IAuthenticatedRequest extends Request {
    user?: IJwtPayload;
}
