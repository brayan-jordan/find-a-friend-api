/*
  Warnings:

  - The primary key for the `photos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `photos` table. All the data in the column will be lost.
  - Added the required column `url` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_petId_fkey";

-- AlterTable
ALTER TABLE "photos" DROP CONSTRAINT "photos_pkey",
DROP COLUMN "id",
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "petId" DROP NOT NULL,
ADD CONSTRAINT "photos_pkey" PRIMARY KEY ("url");

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
