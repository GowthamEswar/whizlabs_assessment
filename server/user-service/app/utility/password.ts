import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/dto/userModel";

const APP_SECRET = "our_app_secret";

export const GetSalt = async () => {
  return await bcrypt.genSalt();
};

export const GetHashedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GetHashedPassword(enteredPassword, salt)) == savedPassword;
};

export const GetToken = ({ user_id, email, phone, user_type, name }: UserModel) => {
  console.log("userType--->", user_type, name)
  return jwt.sign(
    {
      user_id,
      email,
      phone,
      user_type,
      name
    },
    APP_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const VerifyToken = async (
  token: string
): Promise<UserModel | false> => {
  try {
    if (token !== "") {
      const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
      return payload as UserModel;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};