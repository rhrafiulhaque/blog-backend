import express from "express";
import validateRequest from "../../middlware/validateRequest";
import { userControllers } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userValidation.userValidationSchemaZod),
  userControllers.createUser
);

export const UserRoutes = router;
