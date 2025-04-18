import express, { NextFunction, RequestHandler } from "express";
import BookController from "../controllers/BookController";
import { AppDataSource } from "../database/data-source";
import { Book } from "../database/entities/Book";
import BookRepository from "../repositories/BookRepository";
import { Request, Response } from "express";
import authenticate from "../middlewares/authMiddleware";
import checkAdminMiddleware from "../middlewares/checkAdminMiddleware";


const bookRepository = new BookRepository(AppDataSource.getRepository(Book));
const bookController = new BookController(bookRepository);

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};
const checkAdmin: RequestHandler = (req, res, next) => {checkAdminMiddleware(req, res, next)};


const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {bookController.listBooks(req, res, next)});

router.post("/", middlewareAuth, checkAdmin, (req: Request, res: Response, next: NextFunction) => {bookController.createBook(req, res, next)});
router.put("/:id", middlewareAuth, checkAdmin, (req: Request, res: Response, next: NextFunction) => {bookController.updateBook(req, res, next)});
router.delete("/:id", middlewareAuth, checkAdmin, (req: Request, res: Response, next: NextFunction) => {bookController.deleteBook(req, res, next)});

export default router;
