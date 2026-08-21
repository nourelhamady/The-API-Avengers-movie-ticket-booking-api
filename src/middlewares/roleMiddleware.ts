import  {authRequest} from "./authMiddleware";
import {Request,Response,NextFunction} from "express";
export function requireRole(role : "customer" | "admin") {
    return (req : Request, res : Response, next : NextFunction) => {

        const user = (req as authRequest).user;
        if (user.role !== role)
            return res.status(403).json({message: "Forbidden: insufficient permissions"});

        next();
    };
}