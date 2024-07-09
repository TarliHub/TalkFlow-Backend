import { Request } from "express";
import { UserRole } from "./UserRole";

export interface IJwtPayload {
    id: number;
    username: string;
    role: UserRole;
}

export interface IAuthenticatedRequest extends Request {
    user?: IJwtPayload;
}
