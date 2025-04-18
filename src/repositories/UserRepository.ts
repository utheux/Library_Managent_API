import { Repository } from "typeorm";
import InterfaceUserRepository from "./interfaces/InterfaceUserRepository";
import { User } from "../database/entities/User";
import { Address } from "../database/entities/Address";
import { AppDataSource } from "../database/data-source";
import { AppError } from "../errors/AppError";


export default class UserRepository implements InterfaceUserRepository {
    constructor(private repository: Repository<User>) {}

    async createUser(user: User): Promise<void> {
        const emailExist = await this.repository.findOne({where: {email: user.email}});
        if (emailExist) {
            throw new AppError('There is already a user with this email', 409);
        }
        await this.repository.save(user);
    }
    async listUsers(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }
    async updateUser(id: number, newDataUser: User): Promise<void> {
        const userToUpdate = await this.repository.findOne({where: {id:id}});

        if(!userToUpdate) {
            throw new AppError('User not found', 404);
        }

        Object.assign(userToUpdate, newDataUser);

        await this.repository.save(userToUpdate);
    }
    async deleteUser(id: number): Promise<void> {
        const userToRemove = await this.repository.findOne({where: {id: id}});

        if(!userToRemove) {
            throw new AppError('User not found', 404);
        }

        await this.repository.remove(userToRemove);
    }
    async updateAddress(id: number, street: string, number: string, neighborhood: string): Promise<void> {
        const userToUpdate = await this.repository.findOne({where: {id: id}});
        const repositoryAddress = AppDataSource.getRepository(Address);

        if(!userToUpdate) {
            throw new AppError('User not found', 404);
        }
    
        if(!userToUpdate.address){
            const address = new Address(street, number, neighborhood);
            await repositoryAddress.save(address);
            userToUpdate.address = address;
            await this.repository.save(userToUpdate);
        } else {
            const addressToUpdate = userToUpdate.address;
    
            addressToUpdate.neighborhood = neighborhood;
            addressToUpdate.street = street;
            addressToUpdate.number = number;
    
            await repositoryAddress.save(addressToUpdate);
        }
    }
}