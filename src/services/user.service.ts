import md5 from "md5";
import { ModelStatic } from "sequelize";
import User from "../database/models/User";
import { IUser } from "../interfaces/IUser";
import { sign } from "../jwt/jwt";
import resp from "../util/resp";
import { userSchema } from "./validations/schema";

class UserService {
  private model: ModelStatic<User> = User;

  async get() {
    const users = await this.model.findAll();
    return resp(200, users);
  }

  async login(body: { email: string; password: string }) {
    console.log(body);
    const hashPassword = md5(body.password);

    const user = await this.model.findOne({
      where: {
        email: body.email,
        password: hashPassword,
      },
    });
    console.log(user);

    if (!user) {
      return resp(404, "User not found");
    }

    const { id, email } = user;

    const token = sign({ id, email });

    return resp(200, { id, email, token });
  }

  async create(user: IUser) {
    const { error } = userSchema.validate(user);
    if (error) {
      return resp(422, error.message);
    }
    const hashPassword = md5(user.password);
    const createdUser = await this.model.create({
      ...user,
      password: hashPassword,
    });
    return resp(201, createdUser);
  }
}

export default UserService;
