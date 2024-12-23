import { Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
};

export type TUserToken = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
};

export const USER_ROLE = {
  user: "user",
  admin: "admin",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
