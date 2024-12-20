import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

const blockUserToDB = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not found");
  }
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { isBlocked: true },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

export const adminServices = {
  blockUserToDB,
};
