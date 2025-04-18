import ReservationRepository from "../repositories/ReservationRepository";
import { NextFunction, Request, Response } from "express";

export default class ReservationController {
    constructor(private repository: ReservationRepository){}

    async createReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const {booksId} = req.body;
    
            const reservation = await this.repository.createReservation(Number(id), booksId);
    
            return res.status(201).json(reservation);
        } catch(err) {
            next(err);
        }
    }

    async listReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const reservations = await this.repository.listReservations();
    
            return res.status(200).json(reservations);
        } catch (err) {
            next(err);
        }
    }

    async deleteReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
    
            await this.repository.deleteReservation(Number(id));
    
            return res.sendStatus(204);

        } catch(err) {
            next(err);
        }

    }

}