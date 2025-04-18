import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Book } from "./entities/Book";
import { Address } from "./entities/Address";
import { Reservation } from "./entities/Reservation";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/database.sqlite",
    logging: true,
    synchronize: true,
    entities: [User, Book, Address, Reservation]

});