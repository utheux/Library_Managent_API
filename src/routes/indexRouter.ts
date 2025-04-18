import 'express-async-errors'
import { Application } from "express"
import userRouter from "./userRouter"
import bookRouter from "./bookRouter"
import reservationRouter from "./reservationRouter"
import erroHandler from "../middlewares/erroHandler"


const router = (app: Application) => {
    app.use("/user", userRouter);
    app.use("/book", bookRouter);
    app.use("/reservation", reservationRouter)

    app.use(erroHandler);

}

export default router;
