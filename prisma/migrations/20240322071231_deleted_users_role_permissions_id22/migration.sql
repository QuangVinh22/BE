/*
  Warnings:

  - You are about to drop the column `role_permissions_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "fk_users_role_permissions";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_permissions_id";
