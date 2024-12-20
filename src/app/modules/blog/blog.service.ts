import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { blogSearchableFields } from "./blog.constant";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDb = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate("author"), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await blogQuery.modelQuery;
  return result;
};

const updateBlogByIdToDB = async (
  blogId: string,
  userId: string,
  updatedData: Partial<TBlog>
) => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog is not found");
  }
  if (isBlogExist.author.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this blog"
    );
  }
  const result = await Blog.findByIdAndUpdate(blogId, updatedData, {
    new: true,
    runValidators: true,
    strict: true,
  });

  return result;
};

const deleteBlogByIdFromDB = async (
  userId: string,
  blogId: string,
  userRole: string
) => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog is not found");
  }

  if (isBlogExist.author.toString() === userId || userRole === "admin") {
    const result = await Blog.findByIdAndDelete(blogId);
    return result;
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this blog"
    );
  }
};

export const blogServices = {
  createBlogIntoDb,
  getAllBlogFromDB,
  updateBlogByIdToDB,
  deleteBlogByIdFromDB,
};
