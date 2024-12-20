import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res, next) => {
  const result = await blogServices.createBlogIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Created Successfull",
    data: result,
  });
});

const getAllBlog = catchAsync(async (req, res, next) => {
  console.log(req.cookies);
  const result = await blogServices.getAllBlogFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrives Successfull",
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlog,
};
