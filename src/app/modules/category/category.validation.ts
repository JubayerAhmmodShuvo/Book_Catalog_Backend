import { z } from 'zod';

export const create_ct_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
});

export const update_ct_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
  }),
});
