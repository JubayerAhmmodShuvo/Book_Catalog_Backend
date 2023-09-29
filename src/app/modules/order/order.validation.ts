import { z } from 'zod';

export const create_order_zod_schema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({
          required_error: 'bookId is required',
        }),
        quantity: z.number({
          required_error: 'quantity is required',
        }),
      }),
      { required_error: 'Bok list is required' }
    ),
  }),
});
