import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.services";
const blockUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const result = await adminServices.blockUserToDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
});

export const adminControllers = {
  blockUser,
};
