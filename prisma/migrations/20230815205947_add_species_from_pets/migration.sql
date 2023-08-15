/*
  Warnings:

  - Added the required column `specie` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetSpecie" AS ENUM ('DOG', 'CAT');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "specie" "PetSpecie" NOT NULL;
