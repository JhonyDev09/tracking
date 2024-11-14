/*
  Warnings:

  - You are about to drop the column `combustible` on the `dato` table. All the data in the column will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehiculo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `aceite` to the `Dato` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Comando_dispositivoId_fkey` ON `comando`;

-- DropIndex
DROP INDEX `Dato_dispositivoId_fkey` ON `dato`;

-- AlterTable
ALTER TABLE `dato` DROP COLUMN `combustible`,
    ADD COLUMN `aceite` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `usuario`;

-- DropTable
DROP TABLE `vehiculo`;

-- CreateTable
CREATE TABLE `Empleado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellidos` VARCHAR(100) NOT NULL,
    `numTel` INTEGER NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `nombreUsuario` VARCHAR(50) NOT NULL,
    `contrasena` VARCHAR(50) NOT NULL,
    `rol` ENUM('ADMIN', 'CHOFER', 'MONITORISTA') NOT NULL,

    UNIQUE INDEX `Empleado_email_key`(`email`),
    UNIQUE INDEX `Empleado_nombreUsuario_key`(`nombreUsuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numSerie` VARCHAR(100) NOT NULL,
    `marcaId` INTEGER NOT NULL,
    `modeloId` INTEGER NOT NULL,
    `colorId` INTEGER NOT NULL,
    `ano` INTEGER NOT NULL,
    `placas` VARCHAR(20) NOT NULL,
    `tipoId` INTEGER NOT NULL,
    `estatusId` INTEGER NOT NULL,
    `descripcion` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispUnidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dispositivoId` INTEGER NOT NULL,
    `unidadId` INTEGER NOT NULL,
    `fechaAsig` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usrUnidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `choferId` INTEGER NOT NULL,
    `unidadId` INTEGER NOT NULL,
    `fechaAsig` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Unidad` ADD CONSTRAINT `Unidad_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `Marca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unidad` ADD CONSTRAINT `Unidad_modeloId_fkey` FOREIGN KEY (`modeloId`) REFERENCES `Modelo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unidad` ADD CONSTRAINT `Unidad_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unidad` ADD CONSTRAINT `Unidad_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `Tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unidad` ADD CONSTRAINT `Unidad_estatusId_fkey` FOREIGN KEY (`estatusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dato` ADD CONSTRAINT `Dato_dispositivoId_fkey` FOREIGN KEY (`dispositivoId`) REFERENCES `Dispositivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comando` ADD CONSTRAINT `Comando_dispositivoId_fkey` FOREIGN KEY (`dispositivoId`) REFERENCES `Dispositivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispUnidad` ADD CONSTRAINT `dispUnidad_dispositivoId_fkey` FOREIGN KEY (`dispositivoId`) REFERENCES `Dispositivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispUnidad` ADD CONSTRAINT `dispUnidad_unidadId_fkey` FOREIGN KEY (`unidadId`) REFERENCES `Unidad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usrUnidad` ADD CONSTRAINT `usrUnidad_choferId_fkey` FOREIGN KEY (`choferId`) REFERENCES `Empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usrUnidad` ADD CONSTRAINT `usrUnidad_unidadId_fkey` FOREIGN KEY (`unidadId`) REFERENCES `Unidad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
