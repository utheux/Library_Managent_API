import { Request, Response, NextFunction} from "express";
import { AppError } from "../errors/AppError";



const erroHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ?? 500;

    const message = err.statusCode ? err.message : "internal server error";

    res.status(statusCode).json({message});
    return next();
};

export default erroHandler;
