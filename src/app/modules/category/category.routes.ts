import express from 'express';


import authHandler from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import requestValidationHandler from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { create_ct_zod_schema, update_ct_zod_schema } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  authHandler(UserRole.admin),
  requestValidationHandler(create_ct_zod_schema),
  CategoryController.categoryCreate
);
router.get('/', CategoryController.categoryList);
router.get('/:id', CategoryController.categoryDetails);

router.patch(
  '/:id',
  authHandler(UserRole.admin),
  requestValidationHandler(update_ct_zod_schema),
  CategoryController.categoryUpdate
);
router.delete(
  '/:id',
  authHandler(UserRole.admin),
  CategoryController.deleteCategory
);

export const CategoriesRoute = router;
