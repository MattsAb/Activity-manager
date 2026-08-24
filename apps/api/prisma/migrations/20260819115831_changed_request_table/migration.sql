/*
  Warnings:

  - You are about to drop the column `recieverId` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_recieverId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "recieverId",
ADD COLUMN     "receiverId" UUID NOT NULL,
ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Friend";

-- CreateIndex
CREATE UNIQUE INDEX "Request_senderId_receiverId_key" ON "Request"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
