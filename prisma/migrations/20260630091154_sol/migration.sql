/*
  Warnings:

  - You are about to drop the `_ProblemsToSolutions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProblemsToSolutions" DROP CONSTRAINT "_ProblemsToSolutions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProblemsToSolutions" DROP CONSTRAINT "_ProblemsToSolutions_B_fkey";

-- AlterTable
ALTER TABLE "problems" ADD COLUMN     "solutions" TEXT[];

-- DropTable
DROP TABLE "_ProblemsToSolutions";
