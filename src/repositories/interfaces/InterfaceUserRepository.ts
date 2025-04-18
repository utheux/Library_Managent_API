import { User } from "../../database/entities/User";

export default interface InterfaceUserRepository {
    createUser(user: User): void | Promise<void>;
    listUsers(): User[] | Promise<User[]>;
    updateUser(id: number, newDataUser: User): void | Promise<void>;
    deleteUser(id: number): void | Promise<void>;
    updateAddress(id: number, street: string, number: string, neighborhood: string): void | Promise<void>;


}