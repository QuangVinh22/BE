-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "updated_time" TIMESTAMP(6),
    "created_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "created_by" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);
