import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { JwtPayload } from 'jsonwebtoken';


const users_list = async (): Promise<Partial<User>[] | null> => {
  const users = await prisma.user.findMany({
    select: {
      id : true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return users;
};


const users_details = async (id: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};


const users_profile = async (
  user_data: JwtPayload
): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: user_data.userId,
      email: user_data.email,
    },
  });
  return user;
};


const users_update = async (
  id: string,
  user_data: User
): Promise<Partial<User> | null> => {
  const user = await prisma.user.update({
    where: {
      id,
    },

    data: user_data,
  });
  return user;
};

const users_delete = async (id: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

export const UserServices = {
  users_details,
  users_list,
  users_delete,
  users_update,
  users_profile,
};
