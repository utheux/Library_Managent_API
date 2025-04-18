import express, { NextFunction, RequestHandler } from "express";
import UserController from "../controllers/UserController";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";
import AuthRepository from "../repositories/AuthRepository";
import AuthController from "../controllers/AuthController";
import authenticate from "../middlewares/authMiddleware";
import checkAdminMiddleware from "../middlewares/checkAdminMiddleware";

const userRepository = new UserRepository(AppDataSource.getRepository(User));
const userController = new UserController(userRepository);
const authRepository = new AuthRepository(AppDataSource.getRepository(User));
const authController = new AuthController(authRepository);

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};
const checkAdmin: RequestHandler = (req, res, next) => {checkAdminMiddleware(req, res, next)};

const router = express.Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {userController.createUser(req, res, next)});
router.post("/login", (req: Request, res: Response, next: NextFunction) => {authController.login(req, res, next)});

router.put("/", middlewareAuth, (req: Request, res: Response, next: NextFunction) => {userController.updateUser(req, res, next)});
router.get("/", middlewareAuth, checkAdmin, (req: Request, res: Response, next: NextFunction) => {userController.listUsers(req, res, next)});
router.delete("/", middlewareAuth, (req: Request, res: Response, next: NextFunction) => {userController.deleteUser(req, res, next)});
router.put("/address", middlewareAuth, (req: Request, res: Response, next: NextFunction) => {userController.updateAddress(req, res, next)});

export default router;