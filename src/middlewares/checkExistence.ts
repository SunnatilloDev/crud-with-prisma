import { RequestHandler } from "express";
import { User } from "../prisma/index";

let checkExistence: RequestHandler = async (req, res, next) => {
  let { username } = req.body;
  let user = await User.findFirst({
    where: { username },
  });
  if (user) {
    return res.status(400).send({
      message: "This username is already taken",
    });
  }
  next();
};

export default checkExistence;
