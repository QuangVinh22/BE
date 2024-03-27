-- AlterTable
ALTER TABLE "payment_method" ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "created_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_by" INTEGER,
ADD COLUMN     "updated_time" TIMESTAMP(6);
