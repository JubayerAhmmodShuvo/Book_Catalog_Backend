import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookServices } from './book.services';
import pick from '../../../shared/pick';
import { book_filter_keys } from './book.constant';
import { pagination_keys } from '../../../constants/pagination';


const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...book_data } = req.body;
    book_data.publicationDate = new Date(
      book_data.publicationDate
    ).toISOString();

  const result = await BookServices.create_new_book(book_data);

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book created successfully',
  });
});


const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id: book_id } = req.params;

  const { ...book_data } = req.body;
  const result = await BookServices.update_book(book_data, book_id);

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book updated successfully',
  });
});


const allBooks = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, book_filter_keys);
  const pagination = pick(req.query, pagination_keys);

  const result = await BookServices.gel_all_books(filers, pagination);

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Books retrieved successfully',
  });
});
//
const cateGoryBooks = catchAsync(async (req: Request, res: Response) => {
  const { categoryID } = req.params;
  const pagination = pick(req.query, pagination_keys);

  const result = await BookServices.gel_books_by_category_id(
    categoryID,
    pagination
  );

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category Books retrieved successfully',
  });
});


const bookDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookServices.get_book_details(id);

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book details retrieved successfully',
  });
});


const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id: book_id } = req.params;
  const result = await BookServices.delete_book(book_id);

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book deleted successfully',
  });
});

export const BookController = {
  createBook,
  bookDetails,
  updateBook,
  deleteBook,
  allBooks,
  cateGoryBooks,
};
