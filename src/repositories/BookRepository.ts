import { Repository } from "typeorm";
import { Book } from "../database/entities/Book";
import InterfaceBookRepository from "./interfaces/InterfaceBookRepository";
import { AppError } from "../errors/AppError";


export default class BookRepository implements InterfaceBookRepository {
    constructor(private repository: Repository<Book>){}

    async createBook(book: Book): Promise<void> {
        await this.repository.save(book);
    }
    async listBooks(): Promise<Book[]> {
        const books = await this.repository.find();
        return books;
    }
    async updateBook(id: number, newDataBook: Book): Promise<void> {
        const bookToUpdate = await this.repository.findOne({where: {
            id: id
        }});

        if (!bookToUpdate) {
            throw new AppError('Book not found', 404);
        }

        Object.assign(bookToUpdate, newDataBook);

        await this.repository.save(bookToUpdate);
    }
    async deleteBook(id: number): Promise<void> {
        const bookToRemove = await this.repository.findOne({where: {
            id: id
        }});

        if (!bookToRemove) {
            throw new AppError('Book not found', 404);
        }

        await this.repository.remove(bookToRemove);
    }
    
}