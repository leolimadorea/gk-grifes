/*
  Warnings:

  - You are about to drop the column `price` on the `VariantValue` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `VariantValue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `VariantValue` DROP COLUMN `price`,
    DROP COLUMN `stock`;

-- CreateTable
CREATE TABLE `ProductVariantValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `variantValueId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0.0,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductVariantValue` ADD CONSTRAINT `ProductVariantValue_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariantValue` ADD CONSTRAINT `ProductVariantValue_variantValueId_fkey` FOREIGN KEY (`variantValueId`) REFERENCES `VariantValue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
