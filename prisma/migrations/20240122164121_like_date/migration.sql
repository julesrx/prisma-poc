/*
  Warnings:

  - Added the required column `date` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
