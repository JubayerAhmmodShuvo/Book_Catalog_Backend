import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

//Category  list
const category_list = async (): Promise<Partial<Category>[] | null> => {
  const cts = await prisma.category.findMany({});
  return cts;
};

//Category  details
const ct_details = async (id: string): Promise<Partial<Category> | null> => {
  const ct = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return ct;
};

//update_category
const create_category = async (
  ct_data: Category
): Promise<Partial<Category> | null> => {
  const ct = await prisma.category.create({
    data: ct_data,
  });
  return ct;
};
//update_category
const update_category = async (
  id: string,
  ct_data: Category
): Promise<Partial<Category> | null> => {
  const ct = await prisma.category.update({
    where: {
      id,
    },

    data: ct_data,
  });
  return ct;
};

//   delete
const ct_delete = async (id: string): Promise<Partial<Category> | null> => {
  const ct = await prisma.category.delete({
    where: {
      id,
    },
  });
  return ct;
};

export const CategoryServices = {
  ct_details,
  ct_delete,
  category_list,
  update_category,
  create_category,
};
