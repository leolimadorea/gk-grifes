-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `image_url` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('SUBSCRIBER', 'ADMIN') NOT NULL DEFAULT 'SUBSCRIBER';

-- CreateTable
CREATE TABLE `AccessLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `ip` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `browser` VARCHAR(191) NOT NULL,
    `deviceType` ENUM('MOBILE', 'DESKTOP') NOT NULL,
    `isIphone` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deviceBrand` VARCHAR(191) NULL,
    `deviceModel` VARCHAR(191) NULL,

    INDEX `AccessLog_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_role_fkey` ON `User`(`role`);

-- AddForeignKey
ALTER TABLE `AccessLog` ADD CONSTRAINT `AccessLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
