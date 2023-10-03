import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import { IUserLoginResponse } from "../user/user.interface";
import { User } from "@prisma/client";
import loginSendResponse from "../../../shared/loginSendRespopnse";


const signupUser = catchAsync(async (req: Request, res: Response) => {
	const { ...user_data } = req.body;
	const result = await AuthServices.user_signup(user_data);

	sendResponse<Partial<User>, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User created successfully!',
  });
});


const loginUser = catchAsync(async (req: Request, res: Response) => {
	const { ...user_data } = req.body;
	const result = await AuthServices.user_login(user_data);
	const token = result?.token;

	loginSendResponse<ILoginResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    token: token,
    message: 'User signin successfully!',
  });
});

export const AuthController = {
	signupUser,
	loginUser,
};
