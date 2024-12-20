import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const userExist = await User.findOne({ email: payload.email });
  if (userExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Email Already Exist");
  }
  const result = await User.create(payload);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
