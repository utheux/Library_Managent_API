import UserRepository from "../repositories/UserRepository"
import { NextFunction, Request, Response } from "express"
import { RequestBodyUser, RequestParamsUser, ResponseBodyUser } from "../types/userTypes"
import { User } from "../database/entities/User";
import RequestBodyAddress from "../types/addressTypes";


export default class UserController {
    constructor(private repository: UserRepository){}
   
    async createUser(req: Request<RequestParamsUser, object, RequestBodyUser>, res: Response<ResponseBodyUser>, next: NextFunction){
        try {
            const {firstName, lastName, email, phoneNumber, password, role} = req.body;
            
            const newUser = new User(firstName, lastName, email, phoneNumber, password, role);
    
            await this.repository.createUser(newUser);
    
            return res.status(201).json({id: newUser.id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email, address: newUser.address ? newUser.address : undefined });

        } catch (err) {
            next(err);
        }
    }

    async updateUser(req: Request<RequestParamsUser, object, RequestBodyUser>, res: Response<ResponseBodyUser>, next: NextFunction){
        try {
            const userId = req.user?.userId
            await this.repository.updateUser(Number(userId), req.body as User);
    
            return res.sendStatus(204);

        } catch (err) {
            next(err);
        }
    }

    async listUsers(req: Request<RequestParamsUser, object, RequestBodyUser>, res: Response<ResponseBodyUser[]>, next: NextFunction){
        try {
            const users = await this.repository.listUsers();
    
            const dadosUser = users.map((user) => {
                return  {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    address: user.address ? user.address : undefined
                }
            });
    
            return res.status(200).json(dadosUser);
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req: Request<RequestParamsUser, object, RequestBodyUser>, res: Response<ResponseBodyUser>, next: NextFunction){
        try {
            const userId = req.user?.userId
            await this.repository.deleteUser(Number(userId));
    
            return res.sendStatus(204);

        } catch(err) {
            next(err);
        }
    }

    async updateAddress(req:Request<RequestParamsUser, object, RequestBodyAddress> , res: Response<ResponseBodyUser>, next: NextFunction) {
        try {
            const userId = req.user?.userId
            const {number, street, neighborhood} = req.body;
    
            
    
            await this.repository.updateAddress(Number(userId), street, number, neighborhood);
    
            return res.sendStatus(204);
        }catch (err) {
            next(err);
        }
    }

}