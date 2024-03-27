/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "Password",
DROP COLUMN "userEmail",
DROP COLUMN "userID",
DROP COLUMN "userName",
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "created_time" TIMESTAMP(6),
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "franchies_id" INTEGER,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role_id" INTEGER,
ADD COLUMN     "role_permissions_id" INTEGER,
ADD COLUMN     "status" BOOLEAN,
ADD COLUMN     "updated_by" INTEGER,
ADD COLUMN     "updated_time" TIMESTAMP(6),
ADD COLUMN     "username" VARCHAR NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "catalogue" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR,
    "image" TEXT,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "catalogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floors" (
    "id" SERIAL NOT NULL,
    "franchise_id" INTEGER,
    "floor_number" INTEGER,
    "floor_name" VARCHAR,
    "description" VARCHAR,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "floors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "franchise" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "floor_id" INTEGER,
    "name" VARCHAR NOT NULL,
    "address" VARCHAR,
    "phone_number" VARCHAR,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "franchise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "product_id" INTEGER,
    "catalogue_id" INTEGER,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "menu_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_role" (
    "id" SERIAL NOT NULL,
    "role_permissions_id" INTEGER NOT NULL,
    "function_url" VARCHAR NOT NULL,
    "function_name" VARCHAR NOT NULL,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "menu_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "franchise_id" INTEGER,
    "floor_id" INTEGER,
    "table_id" INTEGER,
    "payment_method_id" INTEGER,
    "price" DOUBLE PRECISION,
    "vat" DOUBLE PRECISION,
    "cost" DOUBLE PRECISION,
    "discount" DOUBLE PRECISION,
    "total_after_discount" DOUBLE PRECISION,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_detail" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER,
    "product_id" INTEGER,
    "quantity" INTEGER,
    "price_per_unit" DOUBLE PRECISION,
    "total_price" DOUBLE PRECISION,
    "price" DOUBLE PRECISION,
    "vat" DOUBLE PRECISION,
    "cost" DOUBLE PRECISION,
    "discount" DOUBLE PRECISION,
    "total_after_discount" DOUBLE PRECISION,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "orders_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_method" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "status" BOOLEAN,

    CONSTRAINT "payment_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "image" TEXT,
    "price" DOUBLE PRECISION,
    "vat" DOUBLE PRECISION,
    "cost" DOUBLE PRECISION,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER,
    "table_id" INTEGER,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "qr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_role" (
    "id" SERIAL NOT NULL,
    "franchise_id" INTEGER,
    "max_qr_codes" INTEGER,
    "role_id" INTEGER,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "qr_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "floor_id" INTEGER,
    "table_numbers" INTEGER,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6),
    "updated_by" INTEGER,
    "created_by" INTEGER,
    "status" BOOLEAN,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "fk_users_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "fk_users_role_permissions" FOREIGN KEY ("role_permissions_id") REFERENCES "role_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "catalogue" ADD CONSTRAINT "fk_catalogue_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "catalogue" ADD CONSTRAINT "fk_catalogue_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "floors" ADD CONSTRAINT "fk_floors_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "floors" ADD CONSTRAINT "fk_floors_franchise" FOREIGN KEY ("franchise_id") REFERENCES "franchise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "floors" ADD CONSTRAINT "fk_floors_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "franchise" ADD CONSTRAINT "fk_franchise_floor" FOREIGN KEY ("floor_id") REFERENCES "floors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "franchise" ADD CONSTRAINT "fk_franchise_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_products" ADD CONSTRAINT "fk_menu_products_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_products" ADD CONSTRAINT "fk_menu_products_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_products" ADD CONSTRAINT "menu_products_catalogue_id_fkey" FOREIGN KEY ("catalogue_id") REFERENCES "catalogue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_products" ADD CONSTRAINT "menu_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_role" ADD CONSTRAINT "fk_menu_role_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_role" ADD CONSTRAINT "fk_menu_role_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_role" ADD CONSTRAINT "menu_role_role_permissions_id_fkey" FOREIGN KEY ("role_permissions_id") REFERENCES "role_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_floor" FOREIGN KEY ("floor_id") REFERENCES "floors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_franchise" FOREIGN KEY ("franchise_id") REFERENCES "franchise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_payment_method" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_table" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders_detail" ADD CONSTRAINT "fk_orders_detail_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders_detail" ADD CONSTRAINT "fk_orders_detail_order" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders_detail" ADD CONSTRAINT "fk_orders_detail_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders_detail" ADD CONSTRAINT "fk_orders_detail_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_products_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_products_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "qr" ADD CONSTRAINT "fk_qr_order" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "qr" ADD CONSTRAINT "fk_qr_table" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "qr_role" ADD CONSTRAINT "qr_role_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "franchise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "qr_role" ADD CONSTRAINT "qr_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "fk_role_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "fk_role_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "fk_role_permissions_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "fk_role_permissions_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "fk_tables_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "fk_tables_floor" FOREIGN KEY ("floor_id") REFERENCES "floors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "fk_tables_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
