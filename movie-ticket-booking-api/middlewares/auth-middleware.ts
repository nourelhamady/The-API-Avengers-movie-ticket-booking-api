import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface authPayload {
    userId : string;
    role : "customer" | "admin";
}
interface authRequest extends Request {
    user : authPayload;
}

export function authMiddleware (req : Request, res : Response, next : NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as authPayload;
         (req as authRequest).user = decoded;
         next();
    }

    catch (error) {
         return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export function requireRole(role : "customer" | "admin") {
    return (req : Request, res : Response, next : NextFunction) => {

        const user = (req as authRequest).user;
        if (user.role !== role)
            return res.status(403).json({message: "Forbidden: insufficient permissions"});

        next();
    };
}