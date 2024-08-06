import { User } from "../prisma/index";
import bcrypt from "bcrypt";
import { IUser } from "./types";
class userService {
  async getAllUsers() {
    return await User.findMany();
  }
  async createOne(
    fullName: string,
    username: string,
    age: number,
    userPassword: string
  ) {
    let user  = await User.create({
      data: {
        fullName,
        username,
        age,
        password: bcrypt.hashSync(userPassword, 10),
      },
    });
    return user;
  }
  async findUser(id: number) {
    let user = await User.findFirst({
      where: {
        id,
      },
    });
    return user;
  }
  async removeOne(id: number) {
    await User.delete({
      where: { id },
    });
  }
  async updateOne(data: Omit<Partial<IUser>, "id">, id: number) {
    console.log(data);
    let isExist = await User.findFirst({ where: { id } });
    if (!isExist) {
      return;
    }
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }
    let user = await User.update({
      data,
      where: {
        id,
      },
    });
    return user;
  }
}

export default new userService();
