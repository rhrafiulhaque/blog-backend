import express from "express";
import auth from "../../middlware/auth";
import validateRequest from "../../middlware/validateRequest";
import { USER_ROLE } from "../user/user.interface";
import { blogControllers } from "./blog.controller";
import {
  blogUpdateValidationSchemaZod,
  blogValidationSchemaZod,
} from "./blog.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(blogValidationSchemaZod),
  auth(USER_ROLE.user),
  blogControllers.createBlog
);

router.get("/", blogControllers.getAllBlog);
router.patch(
  "/:blogId",
  validateRequest(blogUpdateValidationSchemaZod),
  auth(USER_ROLE.user),
  blogControllers.updateBlogById
);
router.delete(
  "/:blogId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  blogControllers.deleteBlogById
);

export const BlogRoutes = router;
