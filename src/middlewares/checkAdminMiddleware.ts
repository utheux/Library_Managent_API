import { NextFunction, Request, Response } from "express";

const checkAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.user && req.user.userRole === "admin" ) {
        return next();
    }

    return res.status(403).send('Access forbidden: Admins only');
}

export default checkAdminMiddleware;