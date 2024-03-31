/*
  Warnings:

  - Made the column `description` on table `catalogue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `catalogue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `catalogue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `catalogue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `franchise_id` on table `floors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `floor_number` on table `floors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `floor_name` on table `floors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `floors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `floors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `floors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `floors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `franchise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `floor_id` on table `franchise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `franchise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `franchise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `franchise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `franchise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `franchise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `menu_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `catalogue_id` on table `menu_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `menu_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `menu_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `menu_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `menu_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `menu_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `menu_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `franchise_id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `floor_id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `table_id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `payment_method_id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vat` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discount` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order_id` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price_per_unit` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_price` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vat` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discount` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `orders_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `payment_method` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `payment_method` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `payment_method` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `payment_method` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vat` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order_id` on table `qr` required. This step will fail if there are existing NULL values in that column.
  - Made the column `table_id` on table `qr` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `qr` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `qr` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `qr` required. This step will fail if there are existing NULL values in that column.
  - Made the column `franchise_id` on table `qr_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `max_qr_codes` on table `qr_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role_id` on table `qr_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `qr_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `qr_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `qr_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role_id` on table `role_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `role_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `role_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `role_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `role_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `floor_id` on table `tables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `table_numbers` on table `tables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `tables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `tables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `tables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_time` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `franchies_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "catalogue" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "floors" ALTER COLUMN "franchise_id" SET NOT NULL,
ALTER COLUMN "floor_number" SET NOT NULL,
ALTER COLUMN "floor_name" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "franchise" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "floor_id" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "menu_products" ALTER COLUMN "product_id" SET NOT NULL,
ALTER COLUMN "catalogue_id" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "menu_role" ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "franchise_id" SET NOT NULL,
ALTER COLUMN "floor_id" SET NOT NULL,
ALTER COLUMN "table_id" SET NOT NULL,
ALTER COLUMN "payment_method_id" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "vat" SET NOT NULL,
ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders_detail" ALTER COLUMN "order_id" SET NOT NULL,
ALTER COLUMN "product_id" SET NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "price_per_unit" SET NOT NULL,
ALTER COLUMN "total_price" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "vat" SET NOT NULL,
ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "payment_method" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "vat" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "qr" ALTER COLUMN "order_id" SET NOT NULL,
ALTER COLUMN "table_id" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "qr_role" ALTER COLUMN "franchise_id" SET NOT NULL,
ALTER COLUMN "max_qr_codes" SET NOT NULL,
ALTER COLUMN "role_id" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "role" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "role_permissions" ALTER COLUMN "role_id" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "tables" ALTER COLUMN "floor_id" SET NOT NULL,
ALTER COLUMN "table_numbers" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "created_time" SET NOT NULL,
ALTER COLUMN "franchies_id" SET NOT NULL,
ALTER COLUMN "role_id" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
