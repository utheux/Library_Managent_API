import "express-async-errors";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import router from "./routes/indexRouter";
import erroHandler from "./middlewares/erroHandler";
import swaggerUi from "swagger-ui-express";
import documentation from "../documentation.json";


const app = express();
app.use(express.json())
router(app)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(documentation));

app.use(erroHandler)

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT);
});

AppDataSource.initialize()
.then(() => {
    console.log("Database sendo inicializada!")}   
).catch((err)=> {console.log("Erro durante a inicialização", err)});
