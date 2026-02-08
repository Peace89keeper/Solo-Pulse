import "dotenv/config";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Dbconnection } from "./database/Dbconnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservatioRoute.js";

const app = express();

dotenv.config({ path: "./config/config.env" });
Dbconnection();
//Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["POST","GET","PUT","DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1/reservation", reservationRouter);
app.use(errorMiddleware);

export default app;
