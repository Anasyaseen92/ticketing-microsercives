import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // ✅ default import, not named

// ✅ Augment Express's Request interface to include currentUser
declare global {
    namespace Express {
        interface Request {
            currentUser?: string | jwt.JwtPayload;
        }
    }
}

interface UserPayload {
    id: string;
    email: string;
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload; // ✅ jwt.verify
        req.currentUser = payload;
    } catch (error) {
        // If JWT is invalid, simply don't set currentUser
    }
    next();
};