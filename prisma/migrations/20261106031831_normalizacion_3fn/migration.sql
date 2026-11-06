/*
  Warnings:

  - You are about to drop the column `categoria` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `medioPago` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `categoria` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `medio` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `staff` table. All the data in the column will be lost.
  - Added the required column `paymentMethodId` to the `members` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `members` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `newsCategoryId` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `staff` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_userId_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_userId_fkey";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "categoria",
DROP COLUMN "email",
DROP COLUMN "medioPago",
DROP COLUMN "nombre",
ADD COLUMN     "paymentMethodId" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "news" DROP COLUMN "categoria",
ADD COLUMN     "newsCategoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "medio",
ADD COLUMN     "paymentMethodId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "nombre",
ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_categories" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "news_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_nombre_key" ON "payment_methods"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "news_categories_nombre_key" ON "news_categories"("nombre");

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_newsCategoryId_fkey" FOREIGN KEY ("newsCategoryId") REFERENCES "news_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
