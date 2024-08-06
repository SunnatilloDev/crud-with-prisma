import { Router } from "express";
import userController from "./user.controller";
import checkExistence from "../middlewares/checkExistence";

let userRouter = Router();

userRouter.get("/", userController.getAll);
userRouter.post("/", checkExistence, userController.postOne);
userRouter.get("/:id", userController.getOne);
userRouter.delete("/:id", userController.deleteOne);
userRouter.put("/:id", userController.putOne);

export default userRouter;
