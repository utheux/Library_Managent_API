import { Book } from "../database/entities/Book";
import BookRepository from "../repositories/BookRepository";
import { RequestParamsBook, RequestBodyBook, ResponseBodyBook } from "../types/bookTypes";
import { NextFunction, Request, Response} from "express";

export default class BookController {
    constructor(private repository: BookRepository) {}

    async createBook(req: Request<RequestParamsBook, object, RequestBodyBook>, res: Response<ResponseBodyBook>, next: NextFunction) {
        try {
            const {name, description} = req.body;
            const newBook = new Book(name, description);
    
            await this.repository.createBook(newBook);
    
            return res.status(201).json({
                id: newBook.id, name: name, description: description
            });

        } catch(err) {
            next(err);
        }
    }

    async updateBook(req: Request<RequestParamsBook, object, RequestBodyBook>, res: Response<ResponseBodyBook>, next: NextFunction) {
        try {
            const {id} = req.params;
            await this.repository.updateBook(Number(id), req.body as Book);
    
            return res.sendStatus(204);

        } catch (err) {
            next(err);
        }
    }

    async listBooks(req: Request<RequestParamsBook, object, RequestBodyBook>, res: Response<ResponseBodyBook[]>, next: NextFunction) {
        try {
            const books = await this.repository.listBooks();
            const dados = books.map((book) => {
                return {id: book.id, name: book.name, description: book.description}
            });
    
            return res.status(200).json(dados);

        } catch(err) {
            next(err);
        }
    }

    async deleteBook(req: Request<RequestParamsBook, object, RequestBodyBook>, res: Response<ResponseBodyBook>, next: NextFunction){
        try {
            const {id} = req.params;
            await this.repository.deleteBook(Number(id));
    
            return res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }


}