/*
  Warnings:

  - Added the required column `thumbnail` to the `Streams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titile` to the `Streams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Streams" ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "titile" TEXT NOT NULL;
