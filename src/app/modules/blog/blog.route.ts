import express from "express";
import auth from "../../middlware/auth";
import validateRequest from "../../middlware/validateRequest";
import { USER_ROLE } from "../user/user.interface";
import { blogControllers } from "./blog.controller";
import { blogValidationSchemaZod } from "./blog.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(blogValidationSchemaZod),
  blogControllers.createBlog
);

router.get("/", auth(USER_ROLE.user), blogControllers.getAllBlog);

export const BlogRoutes = router;
