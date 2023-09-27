import { jwtHelper } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IUserLogin, IUserLoginResponse } from '../user/user.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';


const user_signup = async (user_data: User): Promise<Partial<User> | null> => {
  const created_user = await prisma.user.create({
    data: user_data,
  });

  const userWithoutPassword: Partial<User> = created_user;
  delete userWithoutPassword.password;

  return userWithoutPassword;
};


const user_login = async (
  user_data: IUserLogin
): Promise<ILoginResponse | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: user_data.email,
      password: user_data.password,
    },
  });

  if (!user) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'User not found, check your email and password'
    );
  }

 
  const token = jwtHelper.create_token(
    {
      userId: user?.id,
      role: user?.role,
    },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  );

  return { token };
};

export const AuthServices = {
  user_signup,
  user_login,
};
