/*
  Warnings:

  - You are about to drop the column `license` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `productKey` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_productId_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `license`,
    MODIFY `productId` INTEGER NULL,
    MODIFY `productQuantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `productKey`,
    DROP COLUMN `type`;

-- CreateTable
CREATE TABLE `PaymentProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `approved` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentDeliveryAddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentId` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `number` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentProduct` ADD CONSTRAINT `PaymentProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentProduct` ADD CONSTRAINT `PaymentProduct_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentDeliveryAddress` ADD CONSTRAINT `PaymentDeliveryAddress_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
