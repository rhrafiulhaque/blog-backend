import express from "express";
import auth from "../../middlware/auth";
import { USER_ROLE } from "../user/user.interface";
import { adminControllers } from "./admin.controller";

const router = express.Router();

router.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  adminControllers.blockUser
);

export const adminRoutes = router;
