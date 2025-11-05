/*
  Warnings:

  - The primary key for the `CurrentStream` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `CurrentStream` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `CurrentStream` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."CurrentStream" DROP CONSTRAINT "CurrentStream_userId_fkey";

-- AlterTable
ALTER TABLE "CurrentStream" DROP CONSTRAINT "CurrentStream_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CurrentStream_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CurrentStream_userId_key" ON "CurrentStream"("userId");

-- AddForeignKey
ALTER TABLE "CurrentStream" ADD CONSTRAINT "CurrentStream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentStream" ADD CONSTRAINT "CurrentStream_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Streams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
