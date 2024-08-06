import express, { NextFunction, Request, Response } from "express";
import userRouter from "./user/user.route";
import dotenv from "dotenv";
dotenv.config();

let app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log("Server stared");
});
