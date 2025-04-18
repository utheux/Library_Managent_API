import { Reservation } from "../../database/entities/Reservation";

export default interface InterfaceReservationRepository {
    createReservation(userId: number, booksId: number[]): Reservation | Promise<Reservation>;
    listReservations(): Reservation[] | Promise<Reservation[]>;
    deleteReservation(id: number): void | Promise<void>


}