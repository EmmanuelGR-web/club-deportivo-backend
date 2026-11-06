/*
  Warnings:

  - You are about to drop the column `cuotaMensual` on the `disciplines` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `staff` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_disciplineId_fkey";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "cuotaMensual",
ADD COLUMN     "categorias" TEXT,
ADD COLUMN     "dias" TEXT,
ADD COLUMN     "imagen" TEXT;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "disciplineId";

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "disciplineId";
