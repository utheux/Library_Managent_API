import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Access token is missing");
    }

    const [, accessToken] = token.split(" ");

    const JWT_SECRET = "secret";

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET) as jwt.JwtPayload;

        req.user = {
            userId: decoded.userId,
            userRole: decoded.userRole,
            userEmail: decoded.userEmail
        };

        next();
    } catch(error) {
        return res.status(401).send(error);
    }

} 

export default authenticate;