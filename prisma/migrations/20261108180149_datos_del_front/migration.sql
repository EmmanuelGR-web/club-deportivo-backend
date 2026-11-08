/*
  Warnings:

  - A unique constraint covering the columns `[memberId,periodo]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "EstadoPago" ADD VALUE 'rechazado';

-- AlterEnum
ALTER TYPE "EstadoSocio" ADD VALUE 'pendiente';

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "altaPresencial" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "debitoAutomatico" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "fotoActualizada" TIMESTAMP(3),
ADD COLUMN     "lecturaIA" JSONB,
ADD COLUMN     "tarjetaEmisor" TEXT,
ADD COLUMN     "tarjetaRed" TEXT,
ADD COLUMN     "tarjetaUltimos4" TEXT;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "comprobanteNombre" TEXT,
ADD COLUMN     "informadoEl" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "motivo" TEXT,
ADD COLUMN     "periodo" TEXT,
ADD COLUMN     "verificacionIA" JSONB;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "debeCambiarContrasena" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "payments_memberId_periodo_key" ON "payments"("memberId", "periodo");
