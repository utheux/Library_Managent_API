import { Repository } from "typeorm";
import InterfaceAuthRepository from "./interfaces/InterfaceAuthRepository";
import { User } from "../database/entities/User";
import verifyPassword from "../utils/verifyPassword";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";


export default class AuthRepository implements InterfaceAuthRepository {
    constructor (private repository: Repository<User>){}

    async login(email: string, password: string): Promise<string> {
        const user = await this.repository.findOne({where: {email: email}});
        
        if (!user) {
            throw new AppError("Email or password incorrect!", 404);
        }

        const JWT_SECRET = "secret";
        

        if(verifyPassword(password, user.password)) {
            const payload = {userId: user.id, userRole: user.role || "user", userEmail: user.email};
            const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "3h"});
            return token;
        } else {
            throw new AppError("Email or password incorrect!", 404);
        }
    }
    
}