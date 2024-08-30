import { UserModel } from "../models/dto/userModel";
import { DBClient } from "../utility/databaseClient";
import { DBoperation } from './dbOperation'

export class UserRepository extends DBoperation {
  constructor() {
    super();
  }

  async createAccount({ phone, email, password, salt, user_type }: UserModel) {
    const queryString =
      "INSERT INTO users(phone,email,password,salt,user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";
    const values = [phone, email, password, salt, user_type];
    const result = await this.executeQuery(queryString, values)
    if (result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
  }

  async findAccount(email: string) {
    const queryString =
      "SELECT user_id, email,name , password, phone, salt, user_type FROM users WHERE email = $1";
    const values = [email];
    const result = await this.executeQuery(queryString, values)
    if (result.rowCount < 1) {
      throw new Error("user does not exist with provided email id!");
    }
    return result.rows[0] as UserModel;
  }

  async findAllusers() {
    const queryString =
      "SELECT user_id, email, name , phone, user_type FROM users";
    const result = await this.executeQuerystring(queryString)
    if (result.rowCount < 1) {
      throw new Error("user does not exist with provided email id!");
    }
    return result.rows as UserModel[];
  }

  async getUser() {
    const queryString =
      "SELECT user_id, email, name , phone, user_type FROM users";
    const result = await this.executeQuerystring(queryString)
    if (result.rowCount < 1) {
      throw new Error("user does not exist with provided email id!");
    }
    return result.rows as UserModel[];
  }
}