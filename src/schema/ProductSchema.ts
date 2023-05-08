import {z} from 'zod';

export const ProductSchema = z.object({
  sku: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export type ProductSchema = z.infer<typeof ProductSchema>;
