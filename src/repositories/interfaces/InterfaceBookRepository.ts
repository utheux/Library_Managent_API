import { Book } from "../../database/entities/Book";

export default interface InterfaceBookRepository {
    createBook(book: Book): void | Promise<void>;
    listBooks():Book[] | Promise<Book[]>;
    updateBook(id: number, newDataBook: Book): void | Promise<void>;
    deleteBook(id: number):void | Promise<void>;


}