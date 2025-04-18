import { Book } from "../database/entities/Book";

type RequestParamsBook = {id?: string};
type RequestBodyBook = Pick<Book, "name" | "description">;
type ResponseBodyBook = Omit<Book, "reservation">;

export {RequestParamsBook, RequestBodyBook, ResponseBodyBook}
