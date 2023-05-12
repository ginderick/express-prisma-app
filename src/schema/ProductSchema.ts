import {z} from 'zod';

export const ProductSchema = z.object({
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const ProductParamSchema = z.object({
  sku: z.string(),
});

export type ProductSchema = z.infer<typeof ProductSchema>;
export type ProductParamSchema = z.infer<typeof ProductParamSchema>;
