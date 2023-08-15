/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_userId_key" ON "orgs"("userId");

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
