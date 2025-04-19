import express, { NextFunction, Request, RequestHandler, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Reservation } from "../database/entities/Reservation";
import ReservationRepository from "../repositories/ReservationRepository";
import ReservationController from "../controllers/ResevationController";
import authenticate from "../middlewares/authMiddleware";
import checkAdminMiddleware from "../middlewares/checkAdminMiddleware";

const reservationRepository = new ReservationRepository(AppDataSource.getRepository(Reservation));
const reservationController = new ReservationController(reservationRepository);

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};
const checkAdmin: RequestHandler = (req, res, next) => {checkAdminMiddleware(req, res, next)};


const router = express.Router();

router.post("/", middlewareAuth, (req: Request, res: Response, next: NextFunction) => {reservationController.createReservation(req, res, next)});
router.get("/", middlewareAuth, checkAdmin, (req: Request, res: Response, next: NextFunction) => {reservationController.listReservations(req, res, next)});
router.delete("/:id", middlewareAuth, checkAdmin, (req: Request, res: Response, next: NextFunction) => {reservationController.deleteReservation(req, res, next)});

export default router;