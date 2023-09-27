import requestValidationHandler from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import {
  user_signin_zod_schema,
  user_signup_zod_schema,
} from './auth.validation';
import express from 'express';

const router = express.Router();

router.post(
  '/signup',
  requestValidationHandler(user_signup_zod_schema),
  AuthController.signupUser
);
router.post(
  '/signin',
  requestValidationHandler(user_signin_zod_schema),
  AuthController.loginUser
);

export const AuthRoute = router;
