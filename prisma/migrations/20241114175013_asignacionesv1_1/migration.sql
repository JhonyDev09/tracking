-- DropIndex
DROP INDEX `Comando_dispositivoId_fkey` ON `comando`;

-- DropIndex
DROP INDEX `Dato_dispositivoId_fkey` ON `dato`;

-- DropIndex
DROP INDEX `dispUnidad_dispositivoId_fkey` ON `dispunidad`;

-- DropIndex
DROP INDEX `dispUnidad_unidadId_fkey` ON `dispunidad`;

-- DropIndex
DROP INDEX `Unidad_colorId_fkey` ON `unidad`;

-- DropIndex
DROP INDEX `Unidad_estatusId_fkey` ON `unidad`;

-- DropIndex
DROP INDEX `Unidad_marcaId_fkey` ON `unidad`;

-- DropIndex
DROP INDEX `Unidad_modeloId_fkey` ON `unidad`;

-- DropIndex
DROP INDEX `Unidad_tipoId_fkey` ON `unidad`;

-- DropIndex
DROP INDEX `usrUnidad_choferId_fkey` ON `usrunidad`;

-- DropIndex
DROP INDEX `usrUnidad_unidadId_fkey` ON `usrunidad`;

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
