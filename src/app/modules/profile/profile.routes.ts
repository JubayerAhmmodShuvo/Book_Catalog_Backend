import express from 'express';

import authHandler from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { UserController } from '../user/user.controller';

const router = express.Router();


router.get(
  '/',
  authHandler(UserRole.admin, UserRole.customer),
  UserController.userProfile
);


export const ProfileRoute = router;
