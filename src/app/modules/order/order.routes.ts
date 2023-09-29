import express from 'express';
import { UserRole } from '@prisma/client';
import requestValidationHandler from '../../middlewares/validateRequest';
import authHandler from '../../middlewares/auth';
import { OrderController } from './order.controller';
import { create_order_zod_schema } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  authHandler(UserRole.customer),
  requestValidationHandler(create_order_zod_schema),
  OrderController.orderCreate
);

router.get(
  '/',
  authHandler(UserRole.customer, UserRole.admin),
  OrderController.AllOrdersList
);
router.get(
  '/:id',
  authHandler(UserRole.customer, UserRole.admin),
  OrderController.orderDetails
);

export const OrderRoutes = router;
