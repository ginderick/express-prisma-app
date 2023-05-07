/*
 Warnings:
 - Changed the type of `quantity` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
 - Changed the type of `price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
 */

-- AlterTable

ALTER TABLE "Product" ADD COLUMN quantity_new Int;

UPDATE "Product" SET quantity_new = quantity::integer;

ALTER TABLE "Product" DROP COLUMN quantity;

ALTER TABLE "Product" RENAME COLUMN quantity_new TO quantity;

ALTER TABLE "Product" ADD COLUMN price_new Int;

UPDATE "Product" SET price_new = price::integer;

ALTER TABLE "Product" DROP COLUMN price;

ALTER TABLE "Product" RENAME COLUMN price_new TO price;