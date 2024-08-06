import e, { NextFunction, Request, Response } from "express";
import userService from "./user.service";

class userController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let users = await userService.getAllUsers();
      res.send(users);
    } catch (err) {
      next(err);
    }
  }
  async postOne(req: Request, res: Response, next: NextFunction) {
    try {
      let { fullName, username, age, password } = req.body;
      let createdUser = await userService.createOne(
        fullName,
        username,
        age,
        password
      );
      res.send({
        message: "Created",
        user: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req.params;

      let user = await userService.findUser(Number(id));

      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req.params;
      await userService.removeOne(Number(id));
      res.send({
        message: "Deleted",
      });
    } catch (error) {
      next(error);
    }
  }
  async putOne(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req.params;
      let { body } = req;
      let updatedUser = await userService.updateOne(body, Number(id));
      if (!updatedUser) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      res.send({ message: "Updated", user: updatedUser });
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
