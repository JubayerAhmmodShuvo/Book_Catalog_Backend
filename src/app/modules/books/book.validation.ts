import { z } from 'zod';

export const create_book_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    author: z.string({ required_error: 'Author is required' }),
    genre: z.string({ required_error: 'Genre is required' }),
    price: z.number({ required_error: 'Price is required' }),
    publicationDate: z.string({
      required_error: 'Publication Date is required',
    }),
    categoryId: z.string({
      required_error: 'categoryId   is required',
    }),
  }),
});

export const update_book_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    author: z.string({ required_error: 'Author is required' }).optional(),
    genre: z.string({ required_error: 'Genre is required' }).optional(),
    price: z.number({ required_error: 'Price is required' }).optional(),
    publication_date: z
      .string({
        required_error: 'Publication Date is required',
      })
      .optional(),
    categoryId: z
      .string({
        required_error: 'categoryId   is required',
      })
      .optional(),
  }),
});
