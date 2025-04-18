import { Repository } from "typeorm";
import { Reservation } from "../database/entities/Reservation";
import InterfaceReservationRepository from "./interfaces/InterfaceReservationRepository";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { Book } from "../database/entities/Book";
import { AppError } from "../errors/AppError";

export default class ReservationRepository implements InterfaceReservationRepository {
    constructor(private repository: Repository<Reservation>){}

    async createReservation(userId: number, booksId: number[]): Promise<Reservation> {
        const userRepository = AppDataSource.getRepository(User);
        const bookRepository = AppDataSource.getRepository(Book);

        const user = await userRepository.findOne({where: {id: userId}});

        if (!user) {
            throw new AppError('User not found', 404);
        }


        const books: Book[] = await Promise.all(booksId.map(async (bookId) => {
            const book = await bookRepository.findOne({ where: { id: bookId } });
            if (!book) {
                throw new AppError('Book not found', 404);
            }
            return book;
        }));

        const newReservation = new Reservation(user, books);
        await this.repository.save(newReservation);

        return newReservation;

    }

    async listReservations(): Promise<Reservation[]> {
        const reservations = await this.repository.find();
        return reservations;
    }

    async deleteReservation(id: number): Promise<void> {
        const bookRepository = AppDataSource.getRepository(Book);
        const reservationToRemove = await this.repository.findOne({where: {id}, relations: ['book']});

        if(!reservationToRemove) {
            throw new AppError('Reservation not found', 404);
        }


        for (const book of reservationToRemove.book) {
            book.reservation = null
            await bookRepository.save(book) 
          }

        await this.repository.remove(reservationToRemove);
    }
    
}