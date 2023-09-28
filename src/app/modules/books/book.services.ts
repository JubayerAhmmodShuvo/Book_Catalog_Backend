import { pagination_map } from '../../../helpers/paginationHelper';
import { GenericResponse } from '../../../interfaces/common';
import { IPagination } from '../../../interfaces/pagination';
import { GetWhereConditions } from './book.condition';
import ApiError from '../../../errors/ApiError' ;

import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IBookFilter } from './book.interface';


const create_new_book = async (book_data: Book): Promise<Book | null> => {
  const isCtExist = await prisma.category.findUnique({
    where: { id: book_data.categoryId },
  });

  if (isCtExist === null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found ');
  }

  const created_book = await prisma.book.create({
    data: book_data,
    include: { category: true },
  });

  return created_book;
};


const gel_all_books = async (
  filers: IBookFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<Book[]> | null> => {
  const { page, size, skip, sortObject } = pagination_map(
    pagination_data,
    'title'
  );

  
  const whereConditions: Prisma.BookWhereInput = GetWhereConditions(filers);

  
  const all_books = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy: sortObject,
  });
  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page: Number(page),
      size: Number(size),
      total: total,
      totalPage,
    },
    data: all_books,
  };
};


const gel_books_by_category_id = async (
  ct_id: string,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<Book[]> | null> => {
  const { page, size, skip, sortObject } = pagination_map(
    pagination_data,
    'title'
  );


  const all_books = await prisma.book.findMany({
    where: { categoryId: ct_id },
    skip,
    take: size,
    orderBy: sortObject,
  });
  const total = await prisma.book.count({ where: { categoryId: ct_id } });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      page: Number(page),
      size: Number(size),
      total: total,
      totalPage,
    },
    data: all_books,
  };
};


const get_book_details = async (id: string): Promise<Book | null> => {
  const isExist = await prisma.book.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  return isExist;
};


const update_book = async (
  book_data: Partial<Book>,
  book_id: string
): Promise<Book | null> => {


  const isExist = await prisma.book.findUnique({ where: { id: book_id } });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  
  const updated_book_data = await prisma.book.update({
    where: { id: book_id },
    data: book_data,
  });

  if (!updated_book_data) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to update book data'
    );
  }

  return updated_book_data;
};


const delete_book = async (book_id: string): Promise<Book | null> => {
  const isExist = await prisma.book.findUnique({ where: { id: book_id } });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const book = await prisma.book.delete({ where: { id: book_id } });

  if (!book) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete book');
  }

  return book;
};

export const BookServices = {
  create_new_book,
  update_book,
  gel_all_books,
  get_book_details,
  delete_book,
  gel_books_by_category_id,
};
