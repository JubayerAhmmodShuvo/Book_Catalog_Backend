import { IUser_role } from '../../../interfaces/common';
import { User } from '@prisma/client';


export type IUserFilter = {
  email?: string;
  role?: IUser_role;
  address?: string;
  searchTerm?: string;
};


export type IUserLogin = {
  email: string;
  password: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  user_details: Partial<User>;
  refreshToken?: string;
};
