-- CreateTable
CREATE TABLE "users" (
    "userID" SERIAL NOT NULL,
    "userName" TEXT,
    "userEmail" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userID")
);
