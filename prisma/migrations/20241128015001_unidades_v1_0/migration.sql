-- CreateTable
CREATE TABLE `Empleado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellidos` VARCHAR(100) NOT NULL,
    `numTel` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `nombreUsuario` VARCHAR(50) NOT NULL,
    `contrasena` VARCHAR(50) NOT NULL,
    `rolId` INTEGER NOT NULL,

    UNIQUE INDEX `Empleado_email_key`(`email`),
    UNIQUE INDEX `Empleado_nombreUsuario_key`(`nombreUsuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dispositivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `imei` VARCHAR(50) NOT NULL,
    `numTel` VARCHAR(20) NOT NULL,
    `icc` VARCHAR(25) NOT NULL,
    `numSerie` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Marca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Modelo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(50) NOT NULL,
    `hexadecimal` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` VARCHAR(50) NOT NULL,

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
CREATE TABLE `Dato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitud` VARCHAR(100) NOT NULL,
    `longitud` VARCHAR(100) NOT NULL,
    `fechahra` DATETIME(3) NOT NULL,
    `velocidad` INTEGER NOT NULL,
    `aceite` DOUBLE NOT NULL,
    `dispositivoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comando` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `comando` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `dispositivoId` INTEGER NOT NULL,

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
ALTER TABLE `Empleado` ADD CONSTRAINT `Empleado_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
