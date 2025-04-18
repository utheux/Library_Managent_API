import AuthRepository from "../repositories/AuthRepository";
import { NextFunction, Request, Response } from "express";

export default class AuthController {
    constructor(private authRepository: AuthRepository) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const  {email, password} = req.body;
    
            const accessToken = await this.authRepository.login(email, password);
    
            return res.status(200).json(accessToken);

        } catch (err) {
            next(err);
        }
    }
}